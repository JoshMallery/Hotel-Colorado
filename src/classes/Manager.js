class Manager {

  percentOccupied (allRooms,occupiedRooms) {
    return Number(((occupiedRooms.length  / allRooms.length) * 100).toFixed(0));
  };

  dailyRevenue(occupiedRooms) {
    return Number(occupiedRooms
          .reduce((acc,cur) =>{
            acc += cur.costPerNight
            return acc
          },0).toFixed(2));
  };

};

export default Manager
