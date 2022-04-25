import './css/styles.css';
import './images/turing-logo.png'
import apiCalls from './apiCalls.js'
import domUpdates from './domUpdates.js'
import Customer from './classes/Customer.js'
import Manager from './classes/Manager.js'
import Rooms from './classes/Rooms.js'
// DataModel query Selectors
//anything that will be an event listener!
//buttons, login etc.

const searchRoomButton = document.querySelector('.nav-search');
const goToBookingsButton = document.querySelector('.nav-displays');
const logonButton = document.querySelector('#submitLogon');
const mgrDropDown = document.querySelector('#managerUserPick');
const bookNowButton = document.querySelector('.card-button');
//const something = document.querySelector('');
//const mgrDeleteButton = document.querySelector('');



//domQuerySelectors
const userTextPrompts = document.querySelector('.user-text-prompts');
const roomPrompts = document.querySelector('.rooms-prompts-container');
const roomsDisplay = document.querySelector('.room-viewing-container');
const navArea = document.querySelector('.nav-container');
const loginArea = document.querySelector('.login-container');
const mgrArea = document.querySelector('.manager-container');
const mgrInfo = document.querySelector('.daily-info');
const mgrCustSelect = document.querySelector('#mgrSelection');
const calendar = document.querySelector('#calendarDate');
//globalVariables
let bookingsData,roomsData,customersData,customer,rooms, customerSpend, bookButton, currentDate, manager, isManager,calendarMin;

const setGlobalVariables = (fetchedData) => {
  console.log(fetchedData)
  customersData = fetchedData[0];
  roomsData = fetchedData[1];
  bookingsData = fetchedData[2];
  currentDate = computeDate();
  //BE SURE TO DELETE THE LINE BELOW THIS!!!!
  console.log(computeDate())
  currentDate = "2022/02/10"; //BE SURE TO DELETE THIS LINE
  domUpdates.setCalendar(calendarMin,calendar);
  console.log('customersdata',customersData)
  rooms = new Rooms(roomsData);

  if (fetchedData[0].length === 50){
    console.log("line 45 set globals manager triggered")
    manager = new Manager();
    isManager = true;
    populateManager(bookingsData,roomsData);
  } else {
    console.log("line 41 set globals customer triggered")
    customer = new Customer(customersData);
    populateCustomer(bookingsData,roomsData);
  }
}

const computeDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth()+1;
  const day = date.getDate();

  if(month < 10 ){
    month = `0${month.toString()}`;
  }
  
  calendarMin = `${year}-${month}-${day}`
  return `${year}/${month}/${day}`;
}

const populateCustomer = (bookings,roomsInfo,isManager,currentDate) => {
  customer.loadExistingBookings(bookings);
  customer.addCostPerNight(roomsInfo);
  customerSpend = customer.calculateSpend(); //maybe not needed
  domUpdates.loadCustomer(customer,roomsDisplay,userTextPrompts,roomPrompts,isManager,currentDate);
}

const populateManager = (bookings,roomsInfo) => {
  manager.roomsAvailableToday = rooms.dateFilter(currentDate,bookings);
  // const roomsAvailableToday = rooms.dateFilter(currentDate,bookings);
  // console.log("available rooms for today",roomsAvailableToday);
  // const occupiedRooms = roomsData.filter(room => !roomsAvailableToday.includes(room));
  manager.occupiedRooms = roomsData.filter(room => !manager.roomsAvailableToday.includes(room));
  // console.log("occupied Rooms line 76",occupiedRooms)
  // const dailyRevenue = occupiedRooms.reduce((acc,cur) =>{
  //   acc += cur.costPerNight
  //   return acc
  // },0)

  // const dailyRevenue = manager.dailyRevenue(occupiedRooms); //keep this inthe manager class and pass it to the DOM
  // console.log("daily revenue line 81",dailyRevenue);

  console.log("manager line 84",manager)

  // const percentOccupied = rooms.percentOccupied(currentDate,bookings);
  // const percentOccupied = manager.percentOccupied(roomsData,occupiedRooms) //keep in the manager class and pass it to the DOM
  // console.log(percentOccupied)

  domUpdates.managerViews(manager,mgrInfo,currentDate,bookings,roomsData,customersData,mgrDropDown,userTextPrompts,roomPrompts,roomsDisplay,bookNowButton)
}

const addBooking = (input) => {
  Promise.all([apiCalls.postBooking(parseInt(input.user),input.date,parseInt(input.room))]).then(data => refreshBookings());
}

const deleteBooking = (bookingID) => {
  Promise.all([apiCalls.removeBooking(bookingID)]).then(data => refreshBookings());
}

const refreshBookings = () => {
  Promise.all([apiCalls.fetchOne('bookings')]).then(data => {populateCustomer(data[0],roomsData,isManager,currentDate); domUpdates.displayBookingConfirm(roomPrompts,searchRoomButton)});
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
    return retrieveManagerLogin()
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

const retrieveDataAfterLogin = (parsedID) => {
  Promise.all(apiCalls.fetchOneCustomerData(parsedID)).then(data => setGlobalVariables(data));
  domUpdates.show(navArea);
  domUpdates.hide(loginArea);
}

const retrieveManagerLogin = () => {
  Promise.all(apiCalls.fetchManagerData()).then(data => setGlobalVariables(data));
  domUpdates.show(navArea);
  domUpdates.show(mgrArea);
  domUpdates.hide(loginArea);

}

//event listeners//
searchRoomButton.addEventListener("click",(event) => {
  if(event.target.id === "availabilitySearch" && event.target.parentNode.children[1].value !== ''){
    event.preventDefault()
  const formattedDate = transformFormDate(event.target.parentNode.children[1].value);
  searchRooms(formattedDate,bookingsData,event.target.parentNode.children[3].value,event.target.parentNode.children[5].value,customer.id)
  };
});

roomsDisplay.addEventListener("click", (event) => {
  let input = event.target.dataset;
  if(event.target.id === "newBooking"){
    addBooking(input);
  }

  if(event.target.id === "deleteBooking"){
    console.log(input.bookingId)
    deleteBooking(input.bookingId);
  }
});

logonButton.addEventListener("click", (event) => {
  let input = event.target.parentNode.children

  determineValidLogin(input[1].value,input[4].value)
  console.log("you click logon!",event.target.parentNode.children[1].value,event.target.parentNode.children[4].value)
});

goToBookingsButton.addEventListener("click",() => {
  domUpdates.displayBookings(customer.bookings,roomsDisplay,roomPrompts)
});

mgrCustSelect.addEventListener("change",(event)=>{
//loadCustomer(event.target.value)
console.log("target+1",parseInt(event.target.value)-1)
customer = new Customer(customersData[parseInt(event.target.value)-1]);
populateCustomer(bookingsData,roomsData,isManager,currentDate);
  console.log("target",event.target.value)
  console.log(event.target.dataset.userID)
    console.log(event.target)

})
