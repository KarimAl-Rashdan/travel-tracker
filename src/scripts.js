//Import Data Section
import './css/styles.css';
import './images/turing-logo.png';
import getAPIData from "./apiCalls";
import Traveler from "./Traveler";
import TravelerRepository from "./TravelerRepository";
import Destination from "./Destination";
import DestinationRepository from "./DestinationRepository";
import Trip from "./Trip";
import TripRepository from "./TripRepository";

//Global Variables Section
let allTravelerData;
let allDestinationData;
let allTripData;
let travelerRepository;
let destinationRepository;
let tripRepository;
let currentTraveler;
let currentTravelerID;
let currentTravelerTrips;

const travelerAPI = "http://localhost:3001/api/v1/travelers";
const destinationAPI = "http://localhost:3001/api/v1/destinations";
const tripAPI = "http://localhost:3001/api/v1/trips";

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
      createClassInstance(allTravelerData, allDestinationData, allTripData);
      getRandomTraveler(allTravelerData);
    })
    .catch((error) => console.log(error));
  }
  
  //Query Selector Section
  const welcomeSection = document.getElementById("welcome-traveler");
  const allTripsSection = document.getElementById("all-status-trips");
  
  //Add Event Listener Section
  window.addEventListener("load", getData);
  
  //Functions
  function createClassInstance(dataSet1, dataSet2, dataSet3) {
    allTravelerData = dataSet1.map((traveler) => new Traveler(traveler));
    travelerRepository = new TravelerRepository(allTravelerData);
    allDestinationData = dataSet2.map((destination) => new Destination(destination));
    destinationRepository = new DestinationRepository(allDestinationData);
    allTripData = dataSet3.map((trip) => new Trip(trip));
    tripRepository = new TripRepository(allTripData);
  }
  
  function getRandomTraveler(travelerData) {
    const randomID = Math.floor(Math.random() * travelerData.length);
    currentTraveler = travelerData[randomID];
    currentTravelerID = currentTraveler.id;
    welcomeTraveler();
    getTrips(currentTravelerID);
    displayAllTrips()
  }

function welcomeTraveler() {
  welcomeSection.innerText = `Welcome ${currentTraveler.name}!`;
}

function getTrips(id) {
// console.log("trips", tripRepository)
 currentTravelerTrips = tripRepository.filterTrips(id)
 console.log("LOOK HERE", tripRepository.specificTripsToUser)
//  console.log("currentTrips", currentTravelerTrips)
}

function displayAllTrips() {
  allTripsSection.innerHTML=""
  const destinations1 = tripRepository.filterTravelersAllTripsDestinations(allDestinationData)
  console.log("this is destinations", destinations1)
  // const estimateCost = tripRepository.calculateOneTripCost
  currentTravelerTrips.forEach(trip => {
    destinations1.forEach(destination => {

  allTripsSection.innerHTML += `
  <section class="trip" id="trip">
    <img class="destination-img" src=${destination.image} alt=${destination.alt}>
    <article class="trip-details">
      <h5 class="destination-name">${destination.destination}</h5>
      <p class="trip-status">Status: ${trip.status}</p>
      <p class="cost-lodging">Lodging Cost Per Day: $${destination.estimatedLodgingCostPerDay}</p>
      <p class="cost-flight">Flight Cost Per Person: $${destination.estimatedFlightCostPerPerson}</p>
      <p class="agent-fee">Agent fee: $${(destination.estimatedLodgingCostPerDay + destination.estimatedFlightCostPerPerson) *.1}</p>
      <p class="total-cost">Total Cost:$${tripRepository.calculateOneTripCost(trip, allDestinationData)}</p>
    </article>
  </section>`
  })
})
}
// function getDestinations()