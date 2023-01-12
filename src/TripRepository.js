
import DestinationRepository from "./DestinationRepository"
// import Destination from "./Destination"
class TripRepository {
  constructor(allTripData) {
    this.allTrips = allTripData
    this.specificTripsToUser = null;
    this.specificPendingTrips = null;
    this.specificApprovedTrips = null;
    this.specificPastTrips = null;
    this.specificFutureTrips = null;
    this.specificAnnualTrips = null;
    this.allDestinations = [];
  }
  filterTrips(id) {
    const specificTravelerTrips = this.allTrips.filter(trip => trip.userID === id);
    this.specificTripsToUser = specificTravelerTrips
    return specificTravelerTrips
  }
  filterPendingTrips() {
    const pendingTrips = this.specificTripsToUser.filter(trip => trip.status === "pending")
    this.specificPendingTrips = pendingTrips
    return pendingTrips
  }
  filterApprovedTrips() {
    const approvedTrips = this.specificTripsToUser.filter(trip => trip.status === "approved")
    this.specificApprovedTrips = approvedTrips
    return approvedTrips
  }
  filterPastTrips(date) {
    this.filterApprovedTrips()
    const pastTrips = this.specificApprovedTrips.filter(trip => new Date(trip.date) < new Date(date))
    this.specificPastTrips = pastTrips
    return pastTrips
  }
  filterFutureTrips(date) {
    this.filterApprovedTrips() 
      const futureTrips = this.specificApprovedTrips.filter(trip => new Date(trip.date) >= new Date(date));
      this.specificFutureTrips = futureTrips;
      return futureTrips;
  }
  findAnnualTrips() { //reminder to change date for scripts
    const dateMin = new Date("2019/05/31")
    const dateMax = new Date("2020/06/01")
    const annualTrips = this.specificApprovedTrips.filter(trip => new Date(trip.date) > dateMin && new Date(trip.date)<= dateMax)
    this.specificAnnualTrips = annualTrips
    return annualTrips
  }
  filterTravelersDestinations(allDestinations) {
    const destinationRepo = new DestinationRepository(allDestinations)
    const annualDestinations = this.specificAnnualTrips.forEach(trip => this.allDestinations.push(destinationRepo.filterDestinationById(trip.destinationID)))
    // console.log(this.allDestinations)
    return this.allDestinations
  }
  calculateAnnualTripCost(destinations) {
    const initialCostTravelers = this.travelers * destination.estimatedFlightCostPerPerson;
    const initialCostDuration = this.duration * destination.estimatedLodgingCostPerDay;
    const initialTotal = initialCostDuration + initialCostTravelers;
    const fee = initialTotal * .1;
    const totalTripCost = initialTotal + fee;
    return totalTripCost;
  }
}




export default TripRepository;