let domUpdates = {

loadCustomer(customer){
  displayBookings(customer.bookings);
  showTotalSpend(customer.calculateSpend());
},

displayBookings(bookings) {
  //viewcards innerhtml = ""
  //   viewcards,innerHTML = populateCards(bookings)
  // if(viewcards innerhtml ===""){
  //   innerhtml = " no bookings found"
  // }
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
  })

}


}

export default domUpdates;
