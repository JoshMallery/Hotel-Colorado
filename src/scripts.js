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
const goToBookingsButton = document.querySelector('.nav-displays');// const something = document.querySelector('');
//const logonButton = document.querySelector(''); listen to the class of the parent!!
// const bookButton = document.querySelector('#newBooking');


//domQuerySelectors
const textPrompts = document.querySelector('.text-prompts');
const custSpend = document.querySelector('.customer-spend');
const roomsDisplay = document.querySelector('.room-viewing-container');
//const something = document.querySelector('');
//const something = document.querySelector('');



//globalVariables
let bookingsData,roomsData,customersData,customer,rooms, customerSpend, bookButton

domUpdates.loadPage('blah blah')


Promise.all(apiCalls.fetchAllApiData()).then(data => setGlobalVariables(data)).then(data => console.log(data));
console.log(apiCalls.fetchAllApiData());

const setGlobalVariables = (fetchedData) => {
  customersData = fetchedData[0];
  roomsData = fetchedData[1];
  bookingsData = fetchedData[2];

  customer = new Customer(customersData[1]); //hardcoded for now as 1 customer
  rooms = new Rooms(roomsData);

  populateCustomer(bookingsData,roomsData);
  // console.log("line 44 customers data",customersData)
}

const populateCustomer = (bookings,roomsInfo) => {
  customer.loadExistingBookings(bookings);
  customer.addCostPerNight(roomsInfo);
  customerSpend = customer.calculateSpend(); //maybe not needed
  domUpdates.loadCustomer(customer,roomsDisplay,textPrompts,custSpend);
}

const refreshBookings = () => {
  Promise.all(apiCalls.fetchOne('bookings')).then(data => populateCustomer(data,roomsData)).then(data => console.log("updated fetched info",data));
}

const searchRooms = (date,bookingInfo,type,bed,customerID) => {
  const results = rooms.roomSearchFilter(date,bookingInfo,type,bed,customerID);
  domUpdates.displaySearchResults(results,roomsDisplay);
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

//event listeners//

searchRoomButton.addEventListener("click",(event) => {
  if(event.target.id === "availabilitySearch" && event.target.parentNode.children[1].value !== ''){
    event.preventDefault()
  const formattedDate = transformFormDate(event.target.parentNode.children[1].value);
  searchRooms(formattedDate,bookingsData,event.target.parentNode.children[3].value,event.target.parentNode.children[5].value,customer.id)
  // bookButton = document.querySelector('#newBooking');
  // console.log(bookButton)
};
});

// bookButton.addEventListener("click",(event) =>{
//   console.log(event.target)
// })

roomsDisplay.addEventListener("click", (event) => {
  if(event.target.id === "newBooking"){
    Promise.all([apiCalls.postBooking(parseInt(event.target.dataset.user),event.target.dataset.date,parseInt(event.target.dataset.room)),apiCalls.fetchOne('bookings')])
    .then(data => populateCustomer(data[1],roomsData))
  }
});

goToBookingsButton.addEventListener("click",() => {
  domUpdates.displayBookings(customer.bookings,roomsDisplay)
})
