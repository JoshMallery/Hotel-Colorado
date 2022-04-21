// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import apiCalls from './apiCalls.js'
import domUpdates from './domUpdates.js'
import Customer from './classes/Customer.js'
import Manager from './classes/Manager.js'
import Rooms from './classes/Rooms.js'
// query Selectors
//anything that will be an event listener!
//buttons, login etc.

const searchRoomButton = document.querySelector('.nav-search');
const goToBookingsButton = document.querySelector('.nav-displays')// const something = document.querySelector('');
//const something = document.querySelector('');
//const something = document.querySelector('');
//const something = document.querySelector('');
//const something = document.querySelector('');
//const something = document.querySelector('');

//globalVariables
let bookingsData,roomsData,customersData,customer,rooms, customerSpend

console.log('This is the JavaScript entry file - your code begins here.');
domUpdates.loadPage('blah blah')

Promise.all(apiCalls.fetchAllApiData()).then(data => setGlobalVariables(data)).then(data => console.log(data));
console.log(apiCalls.fetchAllApiData());

const setGlobalVariables = (fetchedData) => {
  customersData = fetchedData[0];
  roomsData = fetchedData[1];
  bookingsData = fetchedData[2];

  customer = new Customer(customersData[0]); //hardcoded for now as 1 customer
  rooms = new Rooms(roomsData);

  populateCustomer(bookingsData,roomsData);
  console.log("line 44 customers data",customersData)
}

const populateCustomer = (bookings,roomsInfo) => {
  customer.loadExistingBookings(bookings);
  customer.addCostPerNight(roomsInfo);
  customerSpend = customer.calculateSpend(); //maybe not needed
  domUpdates.loadCustomer(customer);
}

const refreshBookings = () => {
  Promise.all(apiCalls.fetchOne('bookings')).then(data => populateCustomer(data,roomsData)).then(data => console.log("updated fetched info",data));
}

const searchRooms = (date,bookingInfo,type,bed) => {
  const results = rooms.roomSearchFilter(date,bookingInfo,type,bed);
  domUpdates.displaySearchResults(results);
}

const addBooking = (bookDate,roomNum) => {
  Promise.all(apiCalls.postBooking(customer.id,bookDate,roomNum)); // is this the best way to get the customer id?
  refreshBookings();
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
}

//event listeners

searchRoomButton.addEventListener("click",(event) => {
const formattedDate = transformFormDate(event.target.parentNode.children[1].value);
searchRooms(formattedDate,bookingsData,event.target.parentNode.children[3].value,event.target.parentNode.children[5].value)
});

goToBookingsButton.addEventListener("click",() => {
  domUpdates.displayBookings(customer.bookings)
})
