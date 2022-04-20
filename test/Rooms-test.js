import {expect} from 'chai';
import bookingsData from './sampleData/bookings-sample.js';
import customersData from './sampleData/customers-sample.js';
import roomsData from './sampleData/rooms-sample.js';
import Rooms from '../src/classes/Rooms.js';

describe('Rooms', () => {
  let bookings, customer1, customer2, customer3, rooms, customerClass, roomsClass;

  beforeEach(() => {
    // customerClass = new Customer();
    customer1 = customersData.customers[0];
    customer2 = customersData.customers[1];
    customer3 = customersData.customers[2];
    rooms = roomsData.rooms;
    bookings = bookingsData.bookings;
    roomsClass = new Rooms();
  })

  it('should be a function', () => {
    expect(Rooms).to.be.a('function');
  });

  it('should be an instance of Rooms', () => {
    expect(roomsClass).to.be.an.instanceOf(Rooms);
  });

});
