class Trip {
  constructor(tripData) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
  }
  estimateTripCost(destination) {
    const initialCostTravelers = this.travelers * destination.estimatedFlightCostPerPerson
    const initialCostDuration = this.duration * destination.estimatedLodgingCostPerDay
    const initialTotal = initialCostDuration + initialCostTravelers
    const fee = initialTotal * .1
    const totalTripCost = initialTotal + fee
    return totalTripCost
  }
}

export default Trip;