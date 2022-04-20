class Rooms{
  constructor(roomData) {
    this.allRooms = roomData;
  }

  dateFilter(date,bookingInfo) {
    return this.allRooms.reduce((acc,cur) =>{
      bookingInfo.forEach(booking => {
        if(booking.date === date) {
          acc = acc.filter(room => room.number !== booking.roomNumber)
        };
      })
      return acc
    },this.allRooms);
  };

  roomSearchFilter(date,bookingInfo,type = null,bed = null) {
    return this.dateFilter(date,bookingInfo)
      .filter(room => (room.roomType === (type || room.roomType)) && ((room.bedSize === (bed || room.bedSize)) ));
  };
};

export default Rooms
