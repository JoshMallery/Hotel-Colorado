let domUpdates = {

loadCustomer(customer){
  this.displayBookings(customer.bookings);
  this.displayTotalSpend(customer.calculateSpend());
},

displayBookings(bookings) {
  //viewcards innerhtml = ""
  //   viewcards,innerHTML = populateCards(bookings)
  // if(viewcards innerhtml ===""){
  //   innerhtml = " no bookings found"
  // }
  console.log("display bookings in DOM file",bookings)
},

displayTotalSpend(amount) {
  //innerhtml of spend = `$${amount}`
},

loadPage(info){
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
