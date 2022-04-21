let domUpdates = {

loadCustomer(customer,cardView,textprompts,spendPrompts){
  this.displayBookings(customer.bookings,cardView);
  this.displayTotalSpend(customer.calculateSpend(),spendPrompts);
  this.greetCustomer(customer.name,textprompts);
},

greetCustomer(customerName,prompts) {
  prompts.innerText = `Hello! and Welcome back ${customerName}`
},

displayBookings(bookings,cardView) {
    cardView.innerHTML = "";
    cardView.innerHTML = this.populateCards(bookings) || "No past or future bookings found, be sure to book a stay!";
},

displayTotalSpend(amount,spendPrompt) {
  spendPrompt.innerText = `Hotel Colorado Spend: $${amount}`
},

loadPage(info){
  //this is maybe maybe redundant?
  console.log('loaded page',info)
},

refreshPage() {

},

displaySearchResults(results,cardView) {
  console.log("results from a search!!", results)
  cardView.innerHTML = "";
  cardView.innerHTML = this.populateCards(results) || "SORRY no rooms available that date, please adjust your parameters and search again!"
},

populateCards(displayData) {
  let cardData= "";
   displayData.map(item =>{
     console.log(item)
    cardData +=
    `<section class="room-card">
      <section class = "room-details">
        Room 1 twin bed, suite
        <img class="room-image" src="./images/roomphoto.jpeg" alt="hotel room">
      </section>
      <section class ="room-card-buttons">
        <button id="newBooking" data-user="${item.customerID}" data-date="${item.bookingDate}" data-room=${item.number} class="card-button">Book Now!</button>
        <button id="1" class="card-button">Managerial Delete</button>
      </section>
    </section>`
  });
  return cardData
}


}

export default domUpdates;
