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
let todaysDate;

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
  const totalSpentSection = document.querySelector(".total-spent");
  const destinationOptions = document.getElementById("available-destinations");
  const submitBookingButton = document.getElementById("submit-booking");
  const dateInput = document.getElementById("input-date");
  const durationInput = document.getElementById("duration-input");
  const travelerInput = document.getElementById("travelers-input");
  const destinationInput = document.getElementById("destinations-input");
  const estimatedTripCost = document.getElementById("estimated-cost");
  const postSuccessDisplay = document.getElementById("post-success");
  const postFailureDisplay = document.getElementById("post-failure");
  const bookingForm = document.getElementById("book-trip")
  const tripsCategories = document.getElementById("trips-categories")
  const upcomingRadioBtn = document.getElementById("upcoming-input")
  const pendingRadioBtn = document.getElementById("pending-input")
  const pastRadioBtn = document.getElementById("past-input")
  const allTripsSection = document.getElementById("all-status-trips");
  const tripTitle = document.querySelector(".trip-title")
  const upcomingTripsSection = document.querySelector(".upcoming")
  const pendingTripsSection = document.querySelector(".pending")
  const pastTripsSection = document.querySelector(".past")
  const resetFilterBtn = document.querySelector(".reset-radios")



  //Add Event Listener Section
  window.addEventListener("load", getData);

  submitBookingButton.addEventListener("click", (event) => {
    createPostObject(event);
  });
  bookingForm.addEventListener("mouseover", () => {
    if(dateInput.value && durationInput.value && travelerInput.value && destinationInput.value) {
      submitBookingButton.disabled = false
      showEstimatedCost();
    } else {
      submitBookingButton.disabled = true
    }
  });

  tripsCategories.addEventListener("click", showTripCategories)
  resetFilterBtn.addEventListener("click", displayAllTrips)
  
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
    todaysDate = "2020/12/01"
    welcomeTraveler();
    getTrips(currentTravelerID);
    displayAllTrips();
    displayTotalSpent();
    showDestinationOptions();
  }

function welcomeTraveler() {
  welcomeSection.innerText = `Welcome ${currentTraveler.name}!`;
}

function getTrips(id) {
 currentTravelerTrips = tripRepository.filterTrips(id);
}

function displayAllTrips() {
  allTripsSection.innerHTML= "";
  tripTitle.innerText = "All Trips"
  tripRepository.specificTripsToUser.forEach(trip => {
    const destination = destinationRepository.filterDestinationById(trip.destinationID);
    allTripsSection.innerHTML += `
    <section class="trip" id="trip">
      <img class="destination-img" src=${destination.image} alt=${destination.alt}>
      <article class="trip-details">
        <h5 class="destination-name">${destination.destination}</h5>
        <p class="trip-status">Status: ${trip.status}</p>
        <p class="trip-date">Date: ${trip.date}</p>
        <p class="trip-travelers">Travelers: ${trip.travelers}</p>
        <p class="trip-duration">Duration: ${trip.duration}</p>
      </article>
    </section>`;
  });
}

function displayTotalSpent() {
  tripRepository.filterApprovedTrips();
  tripRepository.findAnnualTrips();
  tripRepository.filterTravelersAnnualTripsDestinations(destinationRepository);
  const total = tripRepository.calculateAnnualTripCost(tripRepository.allAnnualDestinations);
  totalSpentSection.innerText = `Total Amount Spent on Approved trips (2019/12/01 - 2020/12/01): $${total}`;
}

function showDestinationOptions() {
  destinationRepository.allDestinations.forEach(destination => {
    destinationOptions.innerHTML += `<option value="${destination.destination}">`;
  });
}
function showEstimatedCost() {
  const lastTripID = allTripData.sort((a,b) => b.id - a.id);
  const nextTripIndex = lastTripID[0].id + 1;
  const dateValue = dateInput.value.replaceAll("-", "/");
  const destinationId = destinationRepository.filterDestinationIdByName(destinationInput.value);
  const tripObj = {
    id: nextTripIndex, 
    userID: currentTravelerID, 
    destinationID: destinationId, 
    travelers: Number(travelerInput.value), 
    date: dateValue, 
    duration: Number(durationInput.value), 
    status: "pending", 
    suggestedActivities: [] 
  };
  estimatedTripCost.innerText = tripRepository.calculateOneTripCost(tripObj, destinationRepository);
  return tripObj
}

function createPostObject(event) {
  event.preventDefault();
  if(dateInput.value && durationInput.value && travelerInput.value && destinationInput.value) {
    const tripObj = showEstimatedCost()
    postNewTrip(tripObj);
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
      throw new Error();
    } 
    return response.json();
    })
  .then((data) => {
    postSuccessDisplay.classList.remove("hidden");
    fetchAgain();
  })
  .catch((error) => {
    postFailureDisplay.classList.remove("hidden");
  })
}

function fetchAgain() {
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
    getTrips(currentTravelerID);
    displayAllTrips();
    clearInputs();
  })
  .catch((error) => console.log(error));
}

function clearInputs() {
  dateInput.value = "";
  durationInput.value= "";
  travelerInput.value= "";
  destinationInput.value= "";
  showEstimatedCost.innerText = "";
}

function showTripCategories() {
  console.log("hey youre clicking my assskk")
  if(upcomingRadioBtn.checked) {
    console.log("upcoming")
    tripTitle.innerText = "Upcoming Trips"
    showSection(upcomingTripsSection, pendingTripsSection, pastTripsSection, allTripsSection)
    console.log("oh im checked hyaaaa")
  } else if(pendingRadioBtn.checked) {
    console.log("pending")
    tripTitle.innerText = "Pending Trips"
    showSection(pendingTripsSection, upcomingTripsSection, pastTripsSection, allTripsSection)
  } else if(pastRadioBtn.checked) {
    console.log("past")
    tripTitle.innerText = "Past Trips"
    displayPastTrips(todaysDate)
    showSection(pastTripsSection, upcomingTripsSection, pendingTripsSection, allTripsSection)

  } 
}

function showSection(section1, section2, section3, section4) {
  section1.classList.remove("hidden")
  section2.classList.add("hidden")
  section3.classList.add("hidden")
  section4.classList.add("hidden")
}

function displayPastTrips(date) {
  const pastTrips = tripRepository.filterPastTrips(date)
  pastTrips.forEach(trip => {
    const pastDestinations = destinationRepository.filterDestinationById(trip.destinationID)
    pastTripsSection.innerHTML += `
    <section class="past-trips" id="past-trips">
      <img class="destination-img" src=${pastDestinations.image} alt=${pastDestinations.alt}>
      <article class="trip-details">
      <h5 class="destination-name">${pastDestinations.destination}</h5>
      <p class="trip-status">Status: ${trip.status}</p>
      <p class="trip-date">Date: ${trip.date}</p>
      <p class="trip-travelers">Travelers: ${trip.travelers}</p>
      <p class="trip-duration">Duration: ${trip.duration}</p>
    `
  })
  console.log("past trips", pastTrips)
  return pastTrips
}

