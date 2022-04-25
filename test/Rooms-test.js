import {expect} from 'chai';
import bookingsData from './sampleData/bookings-sample.js';
import roomsData from './sampleData/rooms-sample.js';
import Rooms from '../src/classes/Rooms.js';

describe('Rooms', () => {
  let bookings, date, rooms, roomsClass;

  beforeEach(() => {
    rooms = roomsData.rooms;
    bookings = bookingsData.bookings;
    roomsClass = new Rooms(rooms);
    date = '2022/02/15';
  })

  it('should be a function', () => {
    expect(Rooms).to.be.a('function');
  });

  it('should be an instance of Rooms', () => {
    expect(roomsClass).to.be.an.instanceOf(Rooms);
  });

  it('should hold data for the Rooms', () => {
    expect(roomsClass.allRooms).to.deep.equal(rooms);
  });

  it('should filter available rooms by date', () => {
    expect(roomsClass.dateFilter(date,bookings)).to.deep.equal([rooms[0],rooms[1],rooms[2],rooms[4]]);
  });

  it('should further filter available rooms by roomtype', () => {
    expect(roomsClass.roomSearchFilter(date,bookings,"suite",null)).to.deep.equal([rooms[1]]);
  });

  it('should further filter available rooms by bedSize', () => {
    expect(roomsClass.roomSearchFilter(date,bookings,null,"queen")).to.deep.equal([rooms[0],rooms[4]]);
  });

  it('should further filter available rooms by roomType and bedSize', () => {
    expect(roomsClass.roomSearchFilter(date,bookings,'single room','king')).to.deep.equal([rooms[2]]);
  });

  it('shouldn\'t filter available rooms if roomType or bedSize are not specified', () => {
    expect(roomsClass.roomSearchFilter(date,bookings)).to.deep.equal([rooms[0],rooms[1],rooms[2],rooms[4]]);
  });

  it('should return total occupancy for a date', () => {
    expect(roomsClass.percentOccupied(date,bookings)).to.be.equal(20);
  });

});
