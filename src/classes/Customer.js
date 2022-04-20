class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookings = [];
  }

  loadExistingBookings(allBookings) {
    this.bookings = allBookings.filter(booking => booking.id === this.id)
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
    return this.bookings.reduce((acc,booking)=>{
        acc += booking.amount
      return acc
    },0)
  }



}

export default Customer
