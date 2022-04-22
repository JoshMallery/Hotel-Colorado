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


//domQuerySelectors
const userTextPrompts = document.querySelector('.user-text-prompts');
const roomPrompts = document.querySelector('.rooms-prompts-container');
const roomsDisplay = document.querySelector('.room-viewing-container');
//const something = document.querySelector('');
//const something = document.querySelector('');



//globalVariables
let bookingsData,roomsData,customersData,customer,rooms, customerSpend, bookButton

const setGlobalVariables = (fetchedData) => {
  customersData = fetchedData[0];
  roomsData = fetchedData[1];
  bookingsData = fetchedData[2];
console.log('customersdata',customersData)
  customer = new Customer(customersData[0]);
  rooms = new Rooms(roomsData);

  populateCustomer(bookingsData,roomsData);
}

const populateCustomer = (bookings,roomsInfo) => {
  customer.loadExistingBookings(bookings);
  customer.addCostPerNight(roomsInfo);
  customerSpend = customer.calculateSpend(); //maybe not needed
  domUpdates.loadCustomer(customer,roomsDisplay,userTextPrompts,roomPrompts);
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

  if(splitId.length !== 2){
    return roomPrompts.innerHTML = "Invalid CustomerID, please check spelling and enter again";
  }

  let parsedId = parseInt(splitId[1]);
  if(!(parsedId >= 1  && parsedId <=50)) {
    return roomPrompts.innerHTML ="Invalid Customer Id Number, please veriy and try again";
  }

  if(pwd !== "overlook2021") {
    return roomPrompts.innerHTML = "Invalid Password, please retype your password"
  }

   roomPrompts.innerHTML = "Successful Login, loading Hotel Colorado Website Now!"
   retrieveDataAfterLogin(parsedID)
};

const retrieveDataAfterLogin = (parsedID) => {
  Promise.all(apiCalls.fetchAllApiData(parsedID)).then(data => setGlobalVariables(data));
  domUpdates.show('.nav-container');
  domupdates.hide('.login-container');
}

//event listeners//


// window.addEventListener("load",() => {
//   //show the logon screen here!?!
//   // domUpdates.showLogon();
//   // Promise.all(apiCalls.fetchAllApiData()).then(data => setGlobalVariables(data));
// });

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
