let domUpdates = {

loadCustomer(customer){
  this.displayBookings(customer.bookings);
  this.displayTotalSpend(customer.calculateSpend());
  this.greetCustomer(customer.name);
},

greetCustomer(customerName) {
  //access prompt box and update Text
  console.log("hello", customerName)
},

displayBookings(bookings) {
  console.log("showing customers bookings, bookings to show:", bookings)
  //viewcards innerhtml = ""
  //   viewcards,innerHTML = populateCards(bookings)
  // if(viewcards innerhtml ===""){
  //   innerhtml = " no bookings found"
  // }
},

displayTotalSpend(amount) {
  //innerhtml of spend = `$${amount}`
  console.log("showing totalspend of ", amount)
},

loadPage(info){
  //this is maybe maybe redundant?
  console.log('loaded page',info)
},

refreshPage() {

},

displaySearchResults(results) {
  console.log("results from a search!!", results)
  //viewcards innerhtml = ""
  //   viewcards,innerHTML = populateCards(results)
  // if(viewcards innerhtml ===""){
  //   innerhtml = " SORRY no rooms available that date"
  // }
},

populateCards(displayData) {
  // let cardData
  // return displayData.forEach(item =>{
  //   //cardData += //add the individual cards and buttons here
  // })

}


}

export default domUpdates;
