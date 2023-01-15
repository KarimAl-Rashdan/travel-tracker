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
  const totalSpentSection = document.querySelector(".total-spent")
  const destinationOptions = document.getElementById("available-destinations")
  const submitBookingButton = document.getElementById("submit-booking")
  const dateInput = document.getElementById("input-date")
  const durationInput = document.getElementById("duration-input")
  const travelerInput = document.getElementById("travelers-input")
  const destinationInput = document.getElementById("destinations-input")
  const postSuccessDisplay = document.getElementById("post-success")
  const postFailureDisplay = document.getElementById("post-failure")
  
  //Add Event Listener Section
  window.addEventListener("load", getData);

  submitBookingButton.addEventListener("click", (event) => {
    createPostObject(event)
  })
  
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
    displayTotalSpent()
    showDestinationOptions()
  }

function welcomeTraveler() {
  welcomeSection.innerText = `Welcome ${currentTraveler.name}!`;
}

function getTrips(id) {
 currentTravelerTrips = tripRepository.filterTrips(id)
}

function displayAllTrips() {
  allTripsSection.innerHTML=""
  tripRepository.specificTripsToUser.forEach(trip => {
    const destination = destinationRepository.filterDestinationById(trip.destinationID) 
  allTripsSection.innerHTML += `
  <section class="trip" id="trip">
    <img class="destination-img" src=${destination.image} alt=${destination.alt}>
    <article class="trip-details">
      <h5 class="destination-name">${destination.destination}</h5>
      <p class="trip-status">Status: ${trip.status}</p>
    </article>
  </section>`
  })

}

function displayTotalSpent() {
  tripRepository.filterApprovedTrips()
  tripRepository.findAnnualTrips()
  tripRepository.filterTravelersAnnualTripsDestinations(destinationRepository);
  const total = tripRepository.calculateAnnualTripCost(tripRepository.allAnnualDestinations)
  totalSpentSection.innerText = `Total Amount Spent on Approved trips (2019/12/01 - 2020/12/01): $${total}`
}

function showDestinationOptions() {
  destinationRepository.allDestinations.forEach(destination => {
    // console.log(destination.destination)
    destinationOptions.innerHTML += `<option value="${destination.destination}">`
  })
}
function createPostObject(event) {
event.preventDefault()
if(dateInput.value && durationInput.value && travelerInput.value && destinationInput.value) {
  const lastTripID = allTripData.sort((a,b) => b.id - a.id)
  const nextTripIndex = lastTripID[0].id + 1
  const dateValue = dateInput.value.replaceAll("-", "/")
  const destinationId = destinationRepository.filterDestinationIdByName(destinationInput.value)
  const tripObj = {
    id: nextTripIndex, 
    userID: currentTravelerID, 
    destinationID: destinationId, 
    travelers: Number(travelerInput.value), 
    date: dateValue, 
    duration: Number(durationInput.value), 
    status: "pending", 
    suggestedActivities: [] 
  }
  postNewTrip(tripObj)
} else {
  console.log("Fill in All Inputs!")
  return "Fill in All Inputs!"
}

}

function postNewTrip(tripObject) {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tripObject)
  })
  .then((response) => {
    if(!response.ok) {
      throw new Error()
    } 
    return response.json()
    })
  .then((data) => {
    postSuccessDisplay.classList.remove("hidden")
  })
  .catch((error) => {
    postFailureDisplay.classList.remove("hidden")
  })

}




