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
//const something = document.querySelector('');
//const mgrDeleteButton = document.querySelector('');



//domQuerySelectors
const userTextPrompts = document.querySelector('.user-text-prompts');
const roomPrompts = document.querySelector('.rooms-prompts-container');
const roomsDisplay = document.querySelector('.room-viewing-container');
const navArea = document.querySelector('.nav-container');
const loginArea = document.querySelector('.login-container');
const mgrArea = document.querySelector('.manager-container');

//globalVariables
let bookingsData,roomsData,customersData,customer,rooms, customerSpend, bookButton, currentDate, manager

const setGlobalVariables = (fetchedData) => {
  console.log(fetchedData)
  customersData = fetchedData[0];
  roomsData = fetchedData[1];
  bookingsData = fetchedData[2];
  currentDate = computeDate()
console.log('customersdata',customersData)
  rooms = new Rooms(roomsData);
  if (fetchedData[0].length === 1){
      customer = new Customer(customersData);
      populateCustomer(bookingsData,roomsData);
  } else {
      manager = new Customer({id:0,name:'Hotel Manager'}); //might not need this line
      populateManager(bookingsData,roomsData);
  }
}

const computeDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
}

const populateCustomer = (bookings,roomsInfo) => {
  customer.loadExistingBookings(bookings);
  customer.addCostPerNight(roomsInfo);
  customerSpend = customer.calculateSpend(); //maybe not needed
  domUpdates.loadCustomer(customer,roomsDisplay,userTextPrompts,roomPrompts);
}

const populateManager = (bookings,roomsInfo) => {
  //show rooms available for todays date  use the datefilter
  const roomsToday = rooms.dateFilter(currentDate,bookings);
  //shoe revenue for todays date// use the customer class for this
  const revenueToday = rooms.revenueToday(currentDate,roomsToday);
  //percentage of rooms occupied //use the rooms class for this.
  const percentOccupied = rooms.percentOccupied(currentDate,bookings);
  domUpdates.managerViews(roomsToday,revenueToday,percentOccupied)
}

const addBooking = (input) => {
  Promise.all([apiCalls.postBooking(parseInt(input.user),input.date,parseInt(input.room))]).then(data => refreshBookings());
}

const refreshBookings = () => {
  Promise.all([apiCalls.fetchOne('bookings')]).then(data => {populateCustomer(data[0],roomsData); domUpdates.displayBookingConfirm(roomPrompts,searchRoomButton)});
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
});

logonButton.addEventListener("click", (event) => {
  let input = event.target.parentNode.children

  determineValidLogin(input[1].value,input[4].value)
  console.log("you click logon!",event.target.parentNode.children[1].value,event.target.parentNode.children[4].value)
})

goToBookingsButton.addEventListener("click",() => {
  domUpdates.displayBookings(customer.bookings,roomsDisplay,roomPrompts)
})
