// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import getAPIData from "./apiCalls"
import Traveler from "./Traveler"
import TravelerRepository from "./TravelerRepository"
import Destination from "./Destination"
import DestinationRepository from "./DestinationRepository"
import Trip from "./Trip"
import TripRepository from "./TripRepository"

const travelerAPI = "http://localhost:3001/api/v1/travelers"
const destinationAPI = "http://localhost:3001/api/v1/destinations"
const tripAPI = "http://localhost:3001/api/v1/trips"



console.log('This is the JavaScript entry file - your code begins here.');
