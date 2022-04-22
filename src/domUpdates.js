let domUpdates = {

loadCustomer(customer,cardView,textPrompts,roomPrompt){
  this.displayBookings(customer.bookings,cardView,roomPrompt);
  this.greetCustomer(customer.name,customer.calculateSpend(),textPrompts);
},

greetCustomer(customerName,totalSpend,prompts) {
  prompts.innerText = `Hello! and Welcome back ${customerName}, your total spend at the Hotel is:     $${totalSpend}`
},

displayBookings(bookings,cardView,roomPrompt) {
  console.log(bookings)
    cardView.innerHTML = "";
    cardView.innerHTML = this.populateBookingCards(bookings) || "No past or future bookings found, be sure to book a stay!";
    roomPrompt.innerHTML = `You have made ${bookings.length} bookings with Hotel Colorado.`;
},

displayBookingConfirm(roomPrompt,searchForm) {
roomPrompt.innerHTML = "Your New Booking is Confirmed!"
searchForm.reset();
},

refreshPage() {

},

displaySearchResults(results,cardView,roomPrompt) {
  console.log("results from a search!!", results)
  cardView.innerHTML = "";
  cardView.innerHTML = this.populateSearchCards(results,roomPrompt) || this.noSearchResults(cardView,roomPrompt)
  roomPrompt.innerHTML = `${results.length} rooms have availability on ${results[0].bookingDate}`; //only way to fix right now is not have the date?
},

noSearchResults(cardView,roomsMessage){
  console.log(cardView)
  roomsMessage.innerHTML = "No Rooms have availability that date."
  return cardView.innerHTML = "SORRY no rooms available that date, please adjust your parameters and search again!"
},

populateSearchCards(displayData,roomPrompt) {
  // // consol.el
  // if(displayData.length){
  //   console.log('conditional working')
  // roomPrompt.innerHTML = `${displayData.length} rooms have availability on ${displayData[0].bookingDate}`;
  // }

  let cardData= "";
   displayData.map(item =>{
    cardData +=
    `<section class="room-card">
      <section class = "room-details">
        Room 1 twin bed, suite
        <img class="room-image" src="./images/roomphoto.jpeg" alt="hotel room">
      </section>
      <section class ="room-card-buttons">
        <button id="newBooking" data-user="${item.customerID}" data-date="${item.bookingDate}" data-room=${item.number} class="card-button">Book Now!</button>
      </section>
    </section>`

    // <button id="1" class="card-button">Managerial Delete</button>

  });
  return cardData
},

populateBookingCards(displayData,roomPrompt) {
  // roomPrompt.innerHTML = `${displayData.length} rooms have availability on ${displayData[0].bookingDate}`;
  let cardData= "";
   displayData.map(item =>{
    cardData +=
    `<section class="room-card">
      <section class = "room-details">
        Room 1 twin bed, suite
        <img class="room-image" src="./images/roomphoto.jpeg" alt="hotel room">
      </section>
    </section>`
    // <section class ="room-card-buttons">
    // <button id="newBooking" data-user="${item.customerID}" data-date="${item.bookingDate}" data-room=${item.number} class="card-button">Book Now!</button>
    // <button id="1" class="card-button">Managerial Delete</button>
    // </section>


  });
  return cardData
}


}

export default domUpdates;
