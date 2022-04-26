class Manager {

  percentOccupied (allRooms,occupiedRooms) {
    return (occupiedRooms.length  / allRooms.length) * 100
  };

  dailyRevenue(occupiedRooms) {
    return occupiedRooms
          .reduce((acc,cur) =>{
            acc += cur.costPerNight
            return acc
          },0);
  };

};

export default Manager
