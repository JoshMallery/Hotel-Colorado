import {expect} from 'chai';
import bookingsData from './sampleData/bookings-sample.js';
import customersData from './sampleData/customers-sample.js';
import roomsData from './sampleData/rooms-sample.js';
import Customer from '../src/classes/Customer.js';

describe('Customer', () => {
  let bookings, customer1, customer2, rooms, customerClass;

  beforeEach(() => {
    customerClass = new Customer();
    customer1 = customersData.customers[0];
    customer2 = customersData.customers[1]
    rooms = roomsData.rooms;
    bookings = bookingsData.bookings;
  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
    console.log(customer1)
    console.log(customer2)
    console.log(bookings)
  });

  it('should be an instance of Customer', () => {
    expect(customerClass).to.be.an.instanceOf(Customer);
  });

});
