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

let allTravelerData;
let allDestinationData;
let allTripData;
let travelerRepository;
let destinationRepository;
let tripRepository;
let currentTraveler;
let currentTravelerID;

const travelerAPI = "http://localhost:3001/api/v1/travelers"
const destinationAPI = "http://localhost:3001/api/v1/destinations"
const tripAPI = "http://localhost:3001/api/v1/trips"

function getData() {
  Promise.all([
    getAPIData(travelerAPI),
    getAPIData(destinationAPI),
    getAPIData(tripAPI),
  ])
    .then((response) => {
      allTravelerData = response[0].travelers;
      allDestinationData = response[1].destinations;
      allTripData = response[2].trips;
      createClassInstance(allTravelerData, allDestinationData, allTripData)
      getRandomTraveler(allTravelerData)
    })
    .catch((error) => console.log(error))
}

const welcomeSection = document.getElementById("welcome-traveler")

window.addEventListener("load", getData)


function createClassInstance(dataSet1, dataSet2, dataSet3) {
allTravelerData = dataSet1.map((traveler) => new Traveler(traveler));
travelerRepository = new TravelerRepository(allTravelerData);
allDestinationData = dataSet2.map((destination) => new Destination(destination));
destinationRepository = new DestinationRepository(allDestinationData)
allTripData = dataSet3.map((trip) => new Trip(trip))
tripRepository = new TripRepository(allTripData)
}

function getRandomTraveler(travelerData) {
  const randomID = Math.floor(Math.random() * travelerData.length)
  currentTraveler = allTravelerData[randomID]
  currentTravelerID = currentTraveler.id
  welcomeTraveler()
}

function welcomeTraveler() {
  welcomeSection.innerText = `Welcome ${currentTraveler.name}!`
}