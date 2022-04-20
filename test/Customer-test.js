import {expect} from 'chai';
import bookingsData from './sampleData/bookings-sample.js';
import customersData from './sampleData/customers-sample.js';
import roomsData from './sampleData/rooms-sample.js';
import Customer from '../src/classes/Customer.js';

describe('Customer', () => {
  let bookings, customer1, customer2, customer3, rooms, customerClass;

  beforeEach(() => {
    customer1 = new Customer(customersData.customers[0]);
    // customer1 = customersData.customers[0];
    customer2 = new Customer(customersData.customers[1]);
    customer3 = new Customer(customersData.customers[2]);
    rooms = roomsData.rooms;
    bookings = bookingsData.bookings;

    customer1.loadExistingBookings()
    customer1.addCostPerNight()
  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect(customerClass).to.be.an.instanceOf(Customer);
  });

  it('should hold a customers id', () => {
    expect(customerClass.id).to.equal(customer1.id);
  });

  it('should hold a customers name', () => {
    expect(customerClass.name).to.equal(customer1.name);
  });

  it('should have a place to hold a customers bookings', () => {
    expect(customerClass.bookings).to.deep.equal([]);
  });

  it('should have a function to hold a customers bookings', () => {
    expect(customerClass.loadExistingBookings(bookings)).to.deep.equal([]);
  });

  it('should have a function to add the cost per night of bookings to the class', () => {
    customerClass.addCostPerNight(rooms)
    expect(customerClass.addCostPerNight(rooms)).to.equal("$100");
  });

  it('should have a function to calculate the total cost of money spent at the Hotel', () => {

    expect(customerClass.calculateSpend()).to.equal("$100");
  });

});
