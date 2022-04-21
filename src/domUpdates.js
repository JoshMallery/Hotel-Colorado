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
    cardView.innerHTML = this.populateCards(bookings);

  // if(cardView.innerHTML === []){
  //   cardView.innerHTML = "No bookings found, plese adjust your search parameters and find another wonderfull room"
  //
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
  cardView.innerHTML = this.populateCards(results);
  // if(viewcards innerhtml ===""){
  //   innerhtml = " SORRY no rooms available that date"
  // }
},

populateCards(displayData) {
  let cardData= "";
   displayData.map(item =>{
    cardData +=
    `<section class="room-card">
      <section class = "room-details">
        Room 1 twin bed, suite
        <img class="room-image" src="./images/roomphoto.jpeg" alt="hotel room">
      </section>
      <section class ="room-card-buttons">
        <button id="1"class ="card-button">Book Now!</button>
        <button id="1" class="card-button">Managerial Delete</button>
      </section>
    </section>`
  });
  return cardData
}


}

export default domUpdates;
