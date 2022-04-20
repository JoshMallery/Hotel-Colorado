class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookings = [];
  }

  loadExistingBookings(allBookings) {
    this.bookings = allBookings.filter(booking => booking.userID === this.id)
  };

  addCostPerNight(roomData) {
    this.bookings.forEach(booking => {
      roomData.forEach(room => {
        if(room.number === booking.roomNumber){
          booking.amount = room.costPerNight
        }
      });
    });
  };

  calculateSpend() {
    return Number(this.bookings.reduce((acc,booking)=>{
        acc += booking.amount
      return acc
    },0).toFixed(2))
  };

}

export default Customer
