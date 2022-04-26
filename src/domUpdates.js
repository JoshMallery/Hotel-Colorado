let domUpdates = {

loadCustomer(customer,cardView,textPrompts,roomPrompt,isManager,currentDate){
  this.displayBookings(customer.bookings,cardView,roomPrompt,isManager,currentDate);
  this.greetCustomer(customer.name,customer.calculateSpend(),textPrompts);
},

show(selector) {
  selector.classList.remove('hidden');
},

hide(selector) {
  selector.classList.add('hidden');
},

fetchError(roomPrompts) {
  roomPrompts.innerHTML = "Server Down, Please Try Again Later."
},

updateError(roomPrompts,text) {
  roomPrompts.innerHTML = `Error, You booking was not ${text}. Please Try Again Later.`
},

setCalendar(calendarMin,calendar) {
  calendar.value = calendarMin;
  calendar.min = calendarMin;
},

managerViews(manager,mgrInfo,currentDate,bookings,roomsData,customersData,mgrDropDown,textPrompts,roomPrompt,cardView,bookNowButton,isManager) {
  this.managerToolbarText(manager,mgrInfo,roomsData)
  textPrompts.innerText = `Hello Manager, today's date is ${currentDate}.`
  this.mgrLoadCustomerSelect(customersData,mgrDropDown);
  this.mgrRoomsAvailableToday(manager,roomPrompt,cardView,isManager);
},

managerToolbarText (manager,mgrInfo,roomsData) {
  mgrInfo.innerHTML = `
  Today's Hotel Revenue is $${manager.dailyRevenue(manager.occupiedRooms).toFixed(2)}<br>
  Today's Occupancy is ${manager.percentOccupied(roomsData,manager.occupiedRooms)}%`;
},

mgrRoomsAvailableToday(manager,roomPrompt,cardView,isManager) {
  cardView.innerHTML = this.populateSearchCards(manager.roomsAvailableToday,roomPrompt,isManager);
  roomPrompt.innerHTML = "Today's Available Rooms are below --- To View, Search, and Edit a Users Rooms Use the Manager Toolbar Above";
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
  cardView.innerHTML = "";
  cardView.innerHTML = this.populateBookingCards(bookings,roomPrompt,isManager,currentDate) || "No past or future bookings found, be sure to book a stay!";
},

displayBookingConfirm(roomPrompt,searchForm,text,calendarMin,calendar) {
  roomPrompt.innerHTML = `Your ${text} Booking is Confirmed!`;
  searchForm.reset();
  this.setCalendar(calendarMin,calendar);
},

displaySearchResults(results,cardView,roomPrompt) {
  cardView.innerHTML = "";
  cardView.innerHTML = this.populateSearchCards(results,roomPrompt) || this.noSearchResults(cardView,roomPrompt)
},

noSearchResults(cardView,roomsMessage){
  roomsMessage.innerHTML = "No Rooms have availability that date."
  return cardView.innerHTML = "SORRY no rooms available that date, please adjust your parameters and search again!"
},

populateSearchCards(displayData,roomPrompt,isManager) {
  let cardData= "";
   displayData.map(item =>{

     let hide = "";

     if(isManager) {
       hide = "hidden";
     }

    cardData +=
    `<section class="room-card">
      <section class = "room-details">
        Night of Stay: ${item.bookingDate}<br>
        Room Type: ${item.roomType} with ${item.bedSize} bed<br>
        Nightly Rate: $${item.costPerNight}
        <img class="room-image" src="./images/roomphoto.jpeg" alt="hotel room ${item.number}">
      </section>
      <section class ="room-card-buttons ${hide}">
        <button id="newBooking" data-user="${item.customerID}" data-date="${item.bookingDate}" data-room=${item.number} class="card-button">Book Now!</button>
      </section>
    </section>`;

    roomPrompt.innerHTML = `${displayData.length} rooms have availability on ${displayData[0].bookingDate}`;
  });
  return cardData
},

populateBookingCards(displayData,roomPrompt,isManager,currentDate) {
  let cardData= "";

  displayData
    .reverse()
    .map(item =>{
      let hide = "hidden";

      if(isManager && (new Date(currentDate) < new Date(item.date))) {
        hide = "";
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
  roomPrompt.innerHTML = `You have made ${displayData.length} bookings with Hotel Colorado.`;
  return cardData;
},

}

export default domUpdates;
