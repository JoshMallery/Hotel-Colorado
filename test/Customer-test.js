import {expect} from 'chai';
import bookingsData from './sampleData/bookings-sample.js';
import customersData from './sampleData/customers-sample.js';
import roomsData from './sampleData/rooms-sample.js';
import Customer from '../src/classes/Customer.js';

describe('Customer', () => {
  let bookingsData, customersData, roomsData, customer;

  beforeEach(() => {
    customer = new Customer();
  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Recipe', () => {
    expect(customer).to.be.an.instanceOf(Customer);
  });

});
