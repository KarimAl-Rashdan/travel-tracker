class TripRepository {
  constructor(allTripData) {
    this.allTrips = allTripData
    this.specificTripsToUser = null;
    this.specificPendingTrips = null;
    this.specificApprovedTrips = null;
    this.specificPastTrips = null;
    this.specificFutureTrips = null;
    this.specificAnnualTrips = null;
    this.allAnnualDestinations = [];
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
  findAnnualTrips() { 
    const dateMin = new Date("2019/12/01")
    const dateMax = new Date("2020/12/01")
    const annualTrips = this.specificApprovedTrips.filter(trip => new Date(trip.date) > dateMin && new Date(trip.date)<= dateMax)
    this.specificAnnualTrips = annualTrips
    return annualTrips
  }
  filterTravelersAnnualTripsDestinations(destinationRepo) {
    this.specificAnnualTrips.forEach(trip => this.allAnnualDestinations.push(destinationRepo.filterDestinationById(trip.destinationID)))
    console.log("jewws", this.specificAnnualTrips)
    return this.allAnnualDestinations
  }
  calculateAnnualTripCost(destinations) {
    if(destinations.length >= 1) {
      const initialCost = this.specificAnnualTrips.reduce((acc, trip) => {
        const initialCostTravelers = destinations.forEach(destination => {
          if(destination.id === trip.destinationID) {
            const flightNum = destination.estimatedFlightCostPerPerson * trip.travelers
            const durationNum = destination.estimatedLodgingCostPerDay * trip.duration
            const totalInitial = flightNum + durationNum
            const fee = totalInitial * .1
            acc += (totalInitial + fee)
          }   
        })
        return acc
      }, 0)
      return initialCost;
    } else {
      return 0
    }
  }
  calculateOneTripCost(trip, destinationRepo) {
    const destination = destinationRepo.filterDestinationById(trip.destinationID)
    const travelerCost = destination.estimatedFlightCostPerPerson * trip.travelers
    const durationCost = destination.estimatedLodgingCostPerDay * trip.duration
    const initialCost = travelerCost + durationCost
    this.estimateFee = initialCost * .1
    const finalCost = (initialCost * .1) + initialCost
    return finalCost
  }
}




export default TripRepository;