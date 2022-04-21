class Rooms{
  constructor(roomData) {
    this.allRooms = roomData;
  }

  dateFilter(date,bookingInfo,custID) {
    return this.allRooms.reduce((acc,cur) =>{
      bookingInfo.forEach(booking => {
        cur.customerID = custID;
        cur.bookingDate = date;
        if(booking.date === date) {
          acc = acc.filter(room => room.number !== booking.roomNumber)
        };
      })
      return acc
    },this.allRooms);
  };

  roomSearchFilter(date,bookingInfo,type,bed,customerID) {
    return this.dateFilter(date,bookingInfo,customerID)
      .filter(room => (room.roomType === (type || room.roomType)) && ((room.bedSize === (bed || room.bedSize)) ));
  };
};

export default Rooms
