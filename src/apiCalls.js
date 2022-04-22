let apiCalls = {

fetchOne(param) {
    return fetch(`http://localhost:3001/api/v1/${param}`)
      .then((response) => response.json())
      .then((response) => response[param])
      .catch((error) => console.log(error));
  },

fetchAllApiData() {
    return[this.fetchOne("customers"),this.fetchOne("rooms"), this.fetchOne("bookings")];
  },

postBooking(id,date,roomNum) {
    return fetch('http://localhost:3001/api/v1/bookings', {
      method: "POST",
      body:JSON.stringify({ "userID": id, "date": date, "roomNumber": roomNum }),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(response => console.log("succuessful Post?",response))
    .catch((error) => console.log(error))
  },
  //
  // removeBooking(bookingInfo) {
  //   fetch()
  // }

};
export default apiCalls;
