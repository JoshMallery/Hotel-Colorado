let apiCalls = {

fetchOne(param) {
    return fetch(`http://localhost:3001/api/v1/${param}`)
      .then((response) => response.json())
      .then((response) => response[param])
      .catch((error) => console.log(error));
  },

fetchCustomer(param) {
    return fetch(`http://localhost:3001/api/v1/customers/${param}`)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  },

fetchOneCustomerData(custID) {
    return[this.fetchCustomer(custID),this.fetchOne("rooms"), this.fetchOne("bookings")];
  },

fetchManagerData() {
    return[this.fetchOne("customers"),this.fetchOne("rooms"), this.fetchOne("bookings")];
  },

postBooking(id,date,roomNum) {
    return fetch('http://localhost:3001/api/v1/bookings', {
      method: "POST",
      body:JSON.stringify({ "userID": id, "date": date, "roomNumber": roomNum }),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .catch((error) => console.log(error))
  },

removeBooking(bookingInfo) {
    return fetch(`http://localhost:3001/api/v1/bookings/${bookingInfo}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .catch((error) => console.log(error));
  }

};
export default apiCalls;
