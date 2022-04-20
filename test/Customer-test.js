import {expect} from 'chai';
import bookingsData from './sampleData/bookings-sample.js';
import customersData from './sampleData/customers-sample.js';
import roomsData from './sampleData/rooms-sample.js';
import Customer from '../src/classes/Customer.js';

describe('Customer', () => {
  let bookings, customer1, customer2, customer3, rooms, customerClass;

  beforeEach(() => {
    customer1 = new Customer(customersData.customers[0]);
    customer2 = new Customer(customersData.customers[1]);
    customer3 = new Customer(customersData.customers[2]);
    rooms = roomsData.rooms;
    bookings = bookingsData.bookings;

  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect(customer1).to.be.an.instanceOf(Customer);
  });

  it('should hold a customers id', () => {
    expect(customer1.id).to.equal(customersData.customers[0].id);
  });

  it('should hold a customers name', () => {
    expect(customer1.name).to.equal(customersData.customers[0].name);
  });

  it('should have a place to hold a customers bookings', () => {
    expect(customer1.bookings).to.deep.equal([]);
  });

  it('should have a function to hold a customers bookings', () => {
    customer1.loadExistingBookings(bookings)
    expect(customer1.bookings).to.deep.equal([bookings[3]])
  });

  it('should have a function to add the cost per night of bookings to the class', () => {
    customer1.loadExistingBookings(bookings)
    customer1.addCostPerNight(rooms)
    expect(customer1.bookings[0].amount).to.equal(429.44);
  });

  it('should have a function to calculate the total cost of money spent at the Hotel', () => {
    customer2.loadExistingBookings(bookings)
    customer2.addCostPerNight(rooms)
    expect(customer2.calculateSpend()).to.equal(982.28);
  });

});
