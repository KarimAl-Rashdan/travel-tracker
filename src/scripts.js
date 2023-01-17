//Import Data Section
import './css/styles.css';
import '../src/images/traveltracker-logo.png';
import '../src/images/login-image.png'
import '../src/images/dashboard.png'
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
    })
    .catch((error) => {
      fetchFailure.classList.remove("hidden")
    });
  }
  
  //Query Selector Section
  const dashBoardSection = document.querySelector(".main-container")
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
  const bookingForm = document.getElementById("book-trip");
  const tripsCategories = document.getElementById("trips-categories");
  const upcomingRadioBtn = document.getElementById("upcoming-input");
  const pendingRadioBtn = document.getElementById("pending-input");
  const pastRadioBtn = document.getElementById("past-input");
  const allTripsSection = document.getElementById("all-status-trips");
  const tripTitle = document.querySelector(".trip-title");
  const upcomingTripsSection = document.querySelector(".upcoming");
  const pendingTripsSection = document.querySelector(".pending");
  const pastTripsSection = document.querySelector(".past");
  const resetFilterBtn = document.querySelector(".reset-radios");
  const logInSection = document.querySelector(".login-container")
  const logInForm = document.querySelector(".log-in-form")
  const usernameInput = document.getElementById("username")
  const passwordInput = document.getElementById("password")
  const logInBtn = document.getElementById("log-in-btn")
  const signOutBtn = document.getElementById("log-out")
  const logInError = document.querySelector(".login-error")
  const fetchFailure = document.getElementById("fetch-failure")



  //Add Event Listener Section
  window.addEventListener("load", () => {
    getData()
  });

  submitBookingButton.addEventListener("click", (event) => {
    createPostObject(event);
  });
  bookingForm.addEventListener("mouseover", () => {
    if(dateInput.value && durationInput.value && travelerInput.value && destinationInput.value) {
      submitBookingButton.disabled = false;
      showEstimatedCost();
    } else {
      submitBookingButton.disabled = true;
    }
  });

  tripsCategories.addEventListener("click", showTripCategories);
  resetFilterBtn.addEventListener("click", () => {
    upcomingRadioBtn.checked = false;
    pendingRadioBtn.checked = false;
    pastRadioBtn.checked = false;
    allTripsSection.classList.remove("hidden");
  });

  logInBtn.addEventListener("click", verifyLogIn)
  signOutBtn.addEventListener("click", showLogIn)
  
  //Functions
  function createClassInstance(dataSet1, dataSet2, dataSet3) {
    allTravelerData = dataSet1.map((traveler) => new Traveler(traveler));
    travelerRepository = new TravelerRepository(allTravelerData);
    allDestinationData = dataSet2.map((destination) => new Destination(destination));
    destinationRepository = new DestinationRepository(allDestinationData);
    allTripData = dataSet3.map((trip) => new Trip(trip));
    tripRepository = new TripRepository(allTripData);
  }
  
  

function welcomeTraveler() {
  welcomeSection.innerText = `Welcome ${currentTraveler.name}!`;
}

function getTrips(id) {
 currentTravelerTrips = tripRepository.filterTrips(id);
}

function displayAllTrips() {
  allTripsSection.innerHTML= "";
  tripTitle.innerText = "All Trips";
  currentTravelerTrips.forEach(trip => {
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
  estimatedTripCost.innerText = `Estimated Trip Cost: $${tripRepository.calculateOneTripCost(tripObj, destinationRepository)}`;
  return tripObj;
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
    if (!response.ok) {
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
  if(upcomingRadioBtn.checked) {
    tripTitle.innerText = "Upcoming Trips";
    displayFutureTrips(todaysDate);
    showSection(upcomingTripsSection, pendingTripsSection, pastTripsSection, allTripsSection);
  } else if(pendingRadioBtn.checked) {
    tripTitle.innerText = "Pending Trips";
    displayPendingTrips();
    showSection(pendingTripsSection, upcomingTripsSection, pastTripsSection, allTripsSection);
  } else if(pastRadioBtn.checked) {
    tripTitle.innerText = "Past Trips";
    displayPastTrips(todaysDate);
    showSection(pastTripsSection, upcomingTripsSection, pendingTripsSection, allTripsSection);
  } 
}

function showSection(section1, section2, section3, section4) {
  section1.classList.remove("hidden");
  section2.classList.add("hidden");
  section3.classList.add("hidden");
  section4.classList.add("hidden");
}

function displayPastTrips(date) {
  const pastTrips = tripRepository.filterPastTrips(date);
  pastTrips.forEach(trip => {
    const pastDestinations = destinationRepository.filterDestinationById(trip.destinationID);
    pastTripsSection.innerHTML += `
    <section class="past-trips" id="past-trips">
      <img class="destination-img" src=${pastDestinations.image} alt=${pastDestinations.alt}>
      <article class="trip-details">
        <h5 class="destination-name">${pastDestinations.destination}</h5>
        <p class="trip-status">Status: ${trip.status}</p>
        <p class="trip-date">Date: ${trip.date}</p>
        <p class="trip-travelers">Travelers: ${trip.travelers}</p>
        <p class="trip-duration">Duration: ${trip.duration}</p>
      </article>
    </section>
    `;
  });
  return pastTrips;
}

function displayPendingTrips() {
  const pendingTrips = tripRepository.filterPendingTrips();
  pendingTrips.forEach(trip => {
    const pendingDestinations = destinationRepository.filterDestinationById(trip.destinationID);
    pendingTripsSection.innerHTML += `
    <section class="pending-trips" id="pending-trips">
      <img class="destination-img" src=${pendingDestinations.image} alt=${pendingDestinations.alt}>
      <article class="trip-details">
        <h5 class="destination-name">${pendingDestinations.destination}</h5>
        <p class="trip-status">Status: ${trip.status}</p>
        <p class="trip-date">Date: ${trip.date}</p>
        <p class="trip-travelers">Travelers: ${trip.travelers}</p>
        <p class="trip-duration">Duration: ${trip.duration}</p>
      </article>
    </section>
    `;
  });
}

function displayFutureTrips(date) {
  const futureTrips = tripRepository.filterFutureTrips(date);
  futureTrips.forEach(trip => {
    const futureDestinations = destinationRepository.filterDestinationById(trip.destinationID);
    upcomingTripsSection.innerHTML += `
    <section class="future-trips" id="future-trips">
      <img class="destination-img" src=${futureDestinations.image} alt=${futureDestinations.alt}>
      <article class="trip-details">
        <h5 class="destination-name">${futureDestinations.destination}</h5>
        <p class="trip-status">Status: ${trip.status}</p>
        <p class="trip-date">Date: ${trip.date}</p>
        <p class="trip-travelers">Travelers: ${trip.travelers}</p>
        <p class="trip-duration">Duration: ${trip.duration}</p>
      </article>
    </section>
    `;
  });
}

function verifyLogIn() {
  const mainName = usernameInput.value.substring(0,8)
  if(mainName === "traveler" && usernameInput.value.length >= 9 && usernameInput.value.length < 11 && passwordInput.value === "travel") {
    const allChar = usernameInput.value.split('')
    const filterNum = allChar.filter(character => {
      return Number(character)
    })
    if(allChar[9] === '0') {
      filterNum.push('0')
    }
    const getString = filterNum.join('')
    const getNum = Number(getString)
    const travelerObj = travelerRepository.findTraveler(getNum)
    currentTraveler = travelerObj
    currentTravelerID = travelerObj.id
    todaysDate = "2020/12/01";
    welcomeTraveler()
    getTrips(currentTravelerID)
    showDashboard()
    displayAllTrips()
    displayTotalSpent()
    showDestinationOptions()
    logInForm.reset()
  } else if(usernameInput.value || passwordInput.value) {
    logInError.classList.remove("hidden")
    logInForm.reset()
  } else {
    logInError.classList.remove("hidden")
  }
}

function showLogIn() {
  dashBoardSection.classList.add("hidden")
  logInSection.classList.remove("hidden")
  logInError.classList.add("hidden")
}

function showDashboard() {
  dashBoardSection.classList.remove("hidden")
  logInSection.classList.add("hidden")
}

