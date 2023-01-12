class TripRepository {
  constructor(allTripData) {
    this.allTrips = allTripData
    this.specificTripsToUser = null;
    this.specificPendingTrips = null;
    this.specificApprovedTrips = null;
    this.specificPastTrips = null;
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


}

export default TripRepository;