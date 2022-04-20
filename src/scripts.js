// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import apiCalls from './apiCalls.js'
import domUpdates from './domUpdates.js'
import Customer from './classes/Customer.js'
import Manager from './classes/Manager.js'


console.log('This is the JavaScript entry file - your code begins here.');
domUpdates.loadPage('blah blah')

Promise.all(apiCalls.fetchAllApiData()).then(data => console.log(data));
console.log(apiCalls.fetchAllApiData())
