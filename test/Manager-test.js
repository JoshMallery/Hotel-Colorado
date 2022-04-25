import {expect} from 'chai';
import bookingsData from './sampleData/bookings-sample.js';
import customersData from './sampleData/customers-sample.js';
import roomsData from './sampleData/rooms-sample.js';
import roomsOccupied from './sampleData/rooms-occupied-sample.js';
import Manager from '../src/classes/Manager.js';

describe('Manager', () => {
  let  manager,currentDate, allRooms, occupiedRooms;

  beforeEach(() => {
    manager = new Manager();
    currentDate = "2022/02/15";
    allRooms = roomsData.rooms;
    occupiedRooms = roomsOccupied.rooms;
  })

  it('should be a function', () => {
    expect(Manager).to.be.a('function');
  });

  it('should be an instance of Manager', () => {
    expect(manager).to.be.an.instanceOf(Manager);
  });

  // it('should determine Occcupied rooms', () => {
  //   console.log(allRooms);
  //   console.log(availableRooms);
  //   expect(manager.findOccupiedRooms(allRooms,availableRooms)).to.deep.equal(75);
  // });

  it('should calculate percent of occupied Rooms', () => {
    expect(manager.percentOccupied(allRooms,occupiedRooms)).to.deep.equal(20);
  });

  it('should determine daily revenue', () => {
    expect(manager.dailyRevenue(occupiedRooms)).to.deep.equal(429.44);
  });

});
