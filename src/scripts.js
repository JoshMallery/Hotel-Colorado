import './css/styles.css';
import apiCalls from './apiCalls.js';
import domUpdates from './domUpdates.js';
import Customer from './classes/Customer.js';
import Manager from './classes/Manager.js';
import Rooms from './classes/Rooms.js';

//DataModelQuerySelectors/////
const searchRoomButton = document.querySelector('.nav-search');
const goToBookingsButton = document.querySelector('.nav-displays');
const mgrDropDown = document.querySelector('#managerUserPick');
const bookNowButton = document.querySelector('.card-button');

//DOMQuerySelectors/////
const logonButton = document.querySelector('#submitLogon');
const logoffButton = document.querySelector('.logout-button');
const userTextPrompts = document.querySelector('.user-text-prompts');
const roomPrompts = document.querySelector('.rooms-prompts-container');
const roomsDisplay = document.querySelector('.room-viewing-container');
const navArea = document.querySelector('.nav-container');
const loginArea = document.querySelector('.login-container');
const mgrArea = document.querySelector('.manager-container');
const mgrInfo = document.querySelector('.daily-info');
const mgrCustSelect = document.querySelector('#mgrSelection');
const calendar = document.querySelector('#calendarDate');

//GlobalVariables/////
let bookingsData, roomsData, customersData, customer, rooms, customerSpend, bookButton, currentDate, manager, isManager, calendarMin;

//Fetch Data/////
const retrieveDataAfterLogin = (parsedID) => {
  Promise.all(apiCalls.fetchOneCustomerData(parsedID)).then(data => {setGlobalVariables(data);domUpdates.show(navArea);domUpdates.hide(loginArea);domUpdates.show(logoffButton);}).catch(error => domUpdates.fetchError(roomPrompts));
};

const retrieveManagerLogin = () => {
  Promise.all(apiCalls.fetchManagerData()).then(data => {setGlobalVariables(data);domUpdates.hide(loginArea);domUpdates.show(mgrArea);domUpdates.show(logoffButton);}).catch(error => domUpdates.fetchError(roomPrompts));
};

const addBooking = (input) => {
  Promise.all([apiCalls.postBooking(parseInt(input.user),input.date,parseInt(input.room))]).then(data => refreshBookings('New')).catch(error => domUpdates.updateError(roomPrompts,"Added"));
};

const deleteBooking = (bookingID) => {
  Promise.all([apiCalls.removeBooking(bookingID)]).then(data => refreshBookings('Removed')).catch(error => domUpdates.updateError(roomPrompts,"Deleted"));
};

const refreshBookings = (text) => {
  Promise.all([apiCalls.fetchOne('bookings')]).then(data => {populateCustomer(data[0],roomsData,isManager,currentDate); populateManager(data[0],roomsData); domUpdates.managerToolbarText(manager,mgrInfo,roomsData); domUpdates.displayBookingConfirm(roomPrompts,searchRoomButton,text,calendarMin,calendar); bookingsData = data[0]}).catch(error => domUpdates.fetchError(roomPrompts));
};

//Functions//////
const setGlobalVariables = (fetchedData) => {
  customersData = fetchedData[0];
  roomsData = fetchedData[1];
  bookingsData = fetchedData[2];
  currentDate = computeDate();
  domUpdates.setCalendar(calendarMin,calendar);
  rooms = new Rooms(roomsData);

  if (fetchedData[0].length === 50){
    manager = new Manager();
    isManager = true;
    populateManager(bookingsData,roomsData);
  } else {
    customer = new Customer(customersData);
    populateCustomer(bookingsData,roomsData);
  }
}

const computeDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth()+1;
  const day = date.getDate();

  if(month < 10 ) {
    month = `0${month.toString()}`;
  }

  calendarMin = `${year}-${month}-${day}`;
  return `${year}/${month}/${day}`;
}

const populateCustomer = (bookings,roomsInfo,isManager,currentDate) => {
  customer.loadExistingBookings(bookings);
  customer.addCostPerNight(roomsInfo);
  domUpdates.loadCustomer(customer,roomsDisplay,userTextPrompts,roomPrompts,isManager,currentDate);
}

const populateManager = (bookings,roomsInfo) => {
  manager.roomsAvailableToday = rooms.dateFilter(currentDate,bookings);
  manager.occupiedRooms = roomsData.filter(room => !manager.roomsAvailableToday.includes(room));
  domUpdates.managerViews(manager,mgrInfo,currentDate,bookings,roomsData,customersData,mgrDropDown,userTextPrompts,roomPrompts,roomsDisplay,bookNowButton,isManager)
}


const searchRooms = (date,bookingInfo,type,bed,customerID) => {
  const results = rooms.roomSearchFilter(date,bookingInfo,type,bed,customerID);
  domUpdates.displaySearchResults(results,roomsDisplay,roomPrompts);
}

const transformFormDate = (date) => {
  const result = date.split("").map(num => {
    if(num === "-"){
      return "/";
    } else {
      return num;
    }
  });
  return result.join("")
};

const determineValidLogin = (custID,pwd) => {
  let splitId = custID.split("customer");

  if(custID === 'manager' && pwd === 'overlook2021'){
    return retrieveManagerLogin();
  }

  if(splitId.length !== 2){
    return roomPrompts.innerHTML = "Invalid UserID, please check spelling and enter again";
  }

  let parsedId = parseInt(splitId[1]);
  if(!(parsedId >= 1  && parsedId <=50)) {
    return roomPrompts.innerHTML = "Invalid UserID Number, please verify and try again";
  }

  if(pwd !== "overlook2021") {
    return roomPrompts.innerHTML = "Invalid Password, please retype your password"
  }
   roomPrompts.innerHTML = "Successful Login, loading Hotel Colorado Website Now!";
   retrieveDataAfterLogin(parsedId);
};

//Event Listeners/////
logonButton.addEventListener("click", (event) => {
  let input = event.target.parentNode.children;
  determineValidLogin(input[1].value,input[4].value)
});

logoffButton.addEventListener("click", (event) => {
  document.location.reload(true);
});

goToBookingsButton.addEventListener("click",() => {
  domUpdates.displayBookings(customer.bookings,roomsDisplay,roomPrompts,isManager,currentDate)
});

searchRoomButton.addEventListener("click",(event) => {
  if(event.target.id === "availabilitySearch" && event.target.parentNode.children[1].value !== ''){
    event.preventDefault();
    const formattedDate = transformFormDate(event.target.parentNode.children[1].value);
    searchRooms(formattedDate,bookingsData,event.target.parentNode.children[3].value,event.target.parentNode.children[5].value,customer.id)
  };
});

roomsDisplay.addEventListener("click", (event) => {
  let input = event.target.dataset;

  if(event.target.id === "newBooking"){
    addBooking(input);
  };

  if(event.target.id === "deleteBooking"){
    deleteBooking(input.bookingId);
  };
});

mgrCustSelect.addEventListener("change",(event)=>{
  customer = new Customer(customersData[parseInt(event.target.value)-1]);
  populateCustomer(bookingsData,roomsData,isManager,currentDate);
  domUpdates.show(navArea);
});
