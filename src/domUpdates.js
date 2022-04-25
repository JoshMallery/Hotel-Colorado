let domUpdates = {

loadCustomer(customer,cardView,textPrompts,roomPrompt,isManager,currentDate){
  this.displayBookings(customer.bookings,cardView,roomPrompt,isManager,currentDate);
  this.greetCustomer(customer.name,customer.calculateSpend(),textPrompts);
},

show(selector) {
selector.classList.remove('hidden')
},

hide(selector) {
selector.classList.add('hidden')
},

managerViews(manager,mgrInfo,currentDate,bookings,roomsData,customersData,mgrDropDown,textPrompts,roomPrompt,cardView,bookNowButton) {
  mgrInfo.innerHTML = `
  Today's Hotel Revenue is $${manager.dailyRevenue(manager.occupiedRooms)}<br>
  Today's Occupancy is ${manager.percentOccupied(roomsData,manager.occupiedRooms)}%
  `;

  textPrompts.innerText = `Hello Manager, today's date is ${currentDate}.`
  this.mgrLoadCustomerSelect(customersData,mgrDropDown);
  this.mgrRoomsAvailableToday(manager,roomPrompt,cardView);
  // this.hide(bookNowButton);
},

mgrRoomsAvailableToday(manager,roomPrompt,cardView) {
cardView.innerHTML = this.populateRoomsTodayCards(manager.roomsAvailableToday,roomPrompt);
roomPrompt.innerHTML = "Today's Available Rooms";
},

mgrLoadCustomerSelect(customersData,mgrDropDown) {
 mgrDropDown.innerHTML="";

  customersData.forEach(customer => {
    mgrDropDown.innerHTML +=`
      <option value ="${customer.id}" data-userID="${customer.id}">${customer.name}</input>
      `;
  });
},

greetCustomer(customerName,totalSpend,prompts) {
  prompts.innerText = `Hello! and Welcome back ${customerName}, your total spend at the Hotel is:     $${totalSpend}`
},

displayBookings(bookings,cardView,roomPrompt,isManager,currentDate) {
  console.log(bookings)
    cardView.innerHTML = "";
    cardView.innerHTML = this.populateBookingCards(bookings,isManager,currentDate) || "No past or future bookings found, be sure to book a stay!";
    roomPrompt.innerHTML = `You have made ${bookings.length} bookings with Hotel Colorado.`;
    //MANAGER SHOW BUTTON LOGIC?
    //if (isManager) {
    //this.show(managerBtnElement)
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
populateRoomsTodayCards(displayData,roomPrompt) {
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
    </section>`

    // <section class ="room-card-buttons">
    // <button id="newBooking" data-user="${item.customerID}" data-date="${item.bookingDate}" data-room=${item.number} class="card-button">Book Now!</button>
    // </section>
    // <button id="1" class="card-button">Managerial Delete</button>

  });
  return cardData
},

populateBookingCards(displayData,isManager,currentDate) {

console.log(displayData)
  let cardData= "";

  displayData
    .reverse()
    .map(item =>{
      let hide = "hidden"

      if(isManager && (new Date(currentDate) < new Date(item.date))) {
        //insert logic to determine if booking date is great or less
        hide = ""
      }

      cardData +=
      `<section class="room-card">
        <section class ="room-details">
          Date of Stay: ${item.date}<br> Room Number: ${item.roomNumber}<br> Cost of stay: $${item.amount}
          <img class="room-image" src="./images/roomphoto.jpeg" alt="hotel room ${item.roomNumber}">
        </section>
        <section class ="room-card-buttons ${hide}">
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
