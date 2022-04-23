let domUpdates = {

loadCustomer(customer,cardView,textPrompts,roomPrompt){
  this.displayBookings(customer.bookings,cardView,roomPrompt);
  this.greetCustomer(customer.name,customer.calculateSpend(),textPrompts);
},

show(selector) {
selector.classList.remove('hidden')
},

hide(selector) {
selector.classList.add('hidden')
},

greetCustomer(customerName,totalSpend,prompts) {
  prompts.innerText = `Hello! and Welcome back ${customerName}, your total spend at the Hotel is:     $${totalSpend}`
},

displayBookings(bookings,cardView,roomPrompt) {
  console.log(bookings)
    cardView.innerHTML = "";
    cardView.innerHTML = this.populateBookingCards(bookings) || "No past or future bookings found, be sure to book a stay!";
    roomPrompt.innerHTML = `You have made ${bookings.length} bookings with Hotel Colorado.`;
    //MANAGER SHOW BUTTON LOGIC?
    //if manager {
    //this.show(mgrbutton)
  //}
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
  let cardData= "";
   displayData.map(item =>{
    cardData +=
    `<section class="room-card">
      <section class = "room-details">
        Night of Stay: ${item.bookingDate}<br>
        Room Type: ${item.roomType} with ${item.bedSize} bed<br>
        Nightly Rate: $${item.costPerNight}
        <img class="room-image" src="./images/roomphoto.jpeg" alt="hotel room ${item.number}">
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

console.log(displayData)
  let cardData= "";

  displayData
    .reverse()
    .map(item =>{
      cardData +=
      `<section class="room-card">
        <section class ="room-details">
          Date of Stay: ${item.date}<br> Room Number: ${item.roomNumber}<br> Cost of stay: $${item.amount}
          <img class="room-image" src="./images/roomphoto.jpeg" alt="hotel room ${item.roomNumber}">
        </section>
        <section class ="room-card-buttons hidden">
        <button id="deleteBooking" data-booking-id ="${item.id}" class="card-button">Delete Booking</button>
        </section>
      </section>`
  });
  return cardData
  //be sure to find the logic to make the manager button show up, AFTER! this entire function has been ran
},

populateManagerBookingCards(displayData,roomPrompt) {

  let cardData= "";

  displayData
    .reverse()
    .map(item =>{
      cardData +=
      `<section class="room-card">
        <section class ="room-details">
          Date of Stay: ${item.date}<br> Room Number: ${item.roomNumber}<br> Cost of stay: $${item.amount}
          <img class="room-image" src="./images/roomphoto.jpeg" alt="hotel room ${item.roomNumber}">
        </section>
        <section class ="room-card-buttons">
        <button id="deleteBooking" data-booking-id ="${item.id}" class="card-button">Delete Booking</button>
        </section>
      </section>`

      // <button id="newBooking" data-user="${item.customerID}" data-date="${item.bookingDate}" data-room=${item.number} class="card-button">Book Now!</button>

  });
  return cardData
},


}

export default domUpdates;
