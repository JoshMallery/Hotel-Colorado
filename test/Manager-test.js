import {expect} from 'chai';
import bookingsData from './sampleData/bookings-sample.js';
import customersData from './sampleData/customers-sample.js';
import roomsData from './sampleData/rooms-sample.js';
import Manager from '../src/classes/Manager.js';


describe('Manager', () => {
  let bookingsData, customersData, roomsData, manager;

  beforeEach(() => {
    manager = new Manager();
  })

  it('should be a function', () => {
    expect(Manager).to.be.a('function');
  });

  it('should be an instance of Recipe', () => {
    expect(manager).to.be.an.instanceOf(Manager);
  });

});
