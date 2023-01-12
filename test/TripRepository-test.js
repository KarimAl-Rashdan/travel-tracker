import { expect } from "chai";
import TripRepository from "../src/TripRepository"
import sampleTripData from "../src/data/sample-trips"
import sampleDestinationData from "../src/data/sample-destinations"
import Destination from "../src/Destination"
import DestinationRepository from "../src/DestinationRepository"

describe("Trip Repository", () => {
  let tripRepository1;

  beforeEach(() => {
    tripRepository1 = new TripRepository(sampleTripData)
  });
  it("Should be a function", () => {
    expect(TripRepository).to.be.a("function")
  });
  it("Should be an instance of Trip Repository", () => {
    expect(tripRepository1).to.be.an.instanceof(TripRepository)
  });
  it("Should hold all trips data", () => {
    expect(tripRepository1.allTrips).to.eql(sampleTripData)
  });
  it("Should filter trips based off user id", () => {
    const traveler17Trips = [
      {
        "id": 66,
        "userID": 17,
        "destinationID": 31,
        "travelers": 6,
        "date": "2020/12/19",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 172,
        "userID": 17,
        "destinationID": 38,
        "travelers": 5,
        "date": "2020/06/17",
        "duration": 13,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 184,
        "userID": 17,
        "destinationID": 11,
        "travelers": 1,
        "date": "2019/12/27",
        "duration": 7,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 73,
        "userID": 17,
        "destinationID": 14,
        "travelers": 2,
        "date": "2020/04/26",
        "duration": 18,
        "status": "pending",
        "suggestedActivities": []
      }, {
        "id": 60,
        "userID": 17,
        "destinationID": 45,
        "travelers": 2,
        "date": "2020/06/23",
        "duration": 17,
        "status": "pending",
        "suggestedActivities": []
      }, {
        "id": 185,
        "userID": 17,
        "destinationID": 35,
        "travelers": 4,
        "date": "2019/09/02",
        "duration": 16,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 186,
        "userID": 17,
        "destinationID": 44,
        "travelers": 6,
        "date": "2020/02/08",
        "duration": 6,
        "status": "approved",
        "suggestedActivities": []
      }
    ];
    expect(tripRepository1.filterTrips(17)).to.eql(traveler17Trips)
  });
  it("Should return array of Traveler's pending trips", () => {
    const traveler17PendingTrips = [
      {
        "id": 73,
        "userID": 17,
        "destinationID": 14,
        "travelers": 2,
        "date": "2020/04/26",
        "duration": 18,
        "status": "pending",
        "suggestedActivities": []
      }, {
        "id": 60,
        "userID": 17,
        "destinationID": 45,
        "travelers": 2,
        "date": "2020/06/23",
        "duration": 17,
        "status": "pending",
        "suggestedActivities": []
      }
    ];
    tripRepository1.filterTrips(17)
    expect(tripRepository1.filterPendingTrips()).to.eql(traveler17PendingTrips)
  });
  it("Should return array of Traveler's approved trips", () => {
    const traveler17ApprovedTrips = [
      {
        "id": 66,
        "userID": 17,
        "destinationID": 31,
        "travelers": 6,
        "date": "2020/12/19",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 172,
        "userID": 17,
        "destinationID": 38,
        "travelers": 5,
        "date": "2020/06/17",
        "duration": 13,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 184,
        "userID": 17,
        "destinationID": 11,
        "travelers": 1,
        "date": "2019/12/27",
        "duration": 7,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 185,
        "userID": 17,
        "destinationID": 35,
        "travelers": 4,
        "date": "2019/09/02",
        "duration": 16,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 186,
        "userID": 17,
        "destinationID": 44,
        "travelers": 6,
        "date": "2020/02/08",
        "duration": 6,
        "status": "approved",
        "suggestedActivities": []
      }
    ];
    tripRepository1.filterTrips(17)
    expect(tripRepository1.filterApprovedTrips()).to.eql(traveler17ApprovedTrips)
  })
  it("Should return array of Traveler's past approved trips", () => {
    const traveler17PastTrips = [
      {
        "id": 184,
        "userID": 17,
        "destinationID": 11,
        "travelers": 1,
        "date": "2019/12/27",
        "duration": 7,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 185,
        "userID": 17,
        "destinationID": 35,
        "travelers": 4,
        "date": "2019/09/02",
        "duration": 16,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 186,
        "userID": 17,
        "destinationID": 44,
        "travelers": 6,
        "date": "2020/02/08",
        "duration": 6,
        "status": "approved",
        "suggestedActivities": []
      }
    ];
    tripRepository1.filterTrips(17)
    expect(tripRepository1.filterPastTrips("2020/06/01")).to.eql(traveler17PastTrips)
  });
  it("Should return array of Traveler's future approved trips", () => {
    const traveler17FutureTrips = [
      {
        "id": 66,
        "userID": 17,
        "destinationID": 31,
        "travelers": 6,
        "date": "2020/12/19",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 172,
        "userID": 17,
        "destinationID": 38,
        "travelers": 5,
        "date": "2020/06/17",
        "duration": 13,
        "status": "approved",
        "suggestedActivities": []
      }
    ];
    tripRepository1.filterTrips(17)
    expect(tripRepository1.filterFutureTrips("2020/06/01")).to.eql(traveler17FutureTrips)
  });
  it("Should return the approved trips f", () => {
    const traveler17AnnualTrips = [
      {
        "id": 184,
        "userID": 17,
        "destinationID": 11,
        "travelers": 1,
        "date": "2019/12/27",
        "duration": 7,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 185,
        "userID": 17,
        "destinationID": 35,
        "travelers": 4,
        "date": "2019/09/02",
        "duration": 16,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 186,
        "userID": 17,
        "destinationID": 44,
        "travelers": 6,
        "date": "2020/02/08",
        "duration": 6,
        "status": "approved",
        "suggestedActivities": []
      }
    ]
    tripRepository1.filterTrips(17)
    tripRepository1.filterApprovedTrips()
    expect(tripRepository1.findAnnualTrips()).to.eql(traveler17AnnualTrips)
  })
  it("Should return total spent this year", () => {
    tripRepository1.filterTrips(17)
    tripRepository1.filterApprovedTrips()
    tripRepository1.findAnnualTrips()
    // const destinationRepo = new DestinationRepository(sampleDestinationData)
    // console.log("destination Repo", destinationRepo)
    








    const destinations = [{
      "id": 11,
      "destination": "Mikonos, Greece",
      "estimatedLodgingCostPerDay": 140,
      "estimatedFlightCostPerPerson": 1000,
      "image": "https://images.unsplash.com/photo-1573783309724-e44b859f5a85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80",
      "alt": "cityscape along the water during the day"
    },{
      "id": 35,
      "destination": "Anchorage, Alaska",
      "estimatedLodgingCostPerDay": 200,
      "estimatedFlightCostPerPerson": 100,
      "image": "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "man riding on kayak surrounded by mountains"
    },{
      "id": 44,
      "destination": "Caye Caulker, Belize",
      "estimatedLodgingCostPerDay": 450,
      "estimatedFlightCostPerPerson": 80,
      "image": "https://images.unsplash.com/photo-1544525977-0a3bca9e560d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      "alt": "boat on dock during daytime"
    }]
    
    expect(tripRepository1.filterTravelersDestinations(sampleDestinationData)).to.eql(tripRepository1.allDestinations)
  })
})

// ["2019/06/01", "2020/06/01"]

/**const destinations = [{
      "id": 11,
      "destination": "Mikonos, Greece",
      "estimatedLodgingCostPerDay": 140,
      "estimatedFlightCostPerPerson": 1000,
      "image": "https://images.unsplash.com/photo-1573783309724-e44b859f5a85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80",
      "alt": "cityscape along the water during the day"
    },{
      "id": 35,
      "destination": "Anchorage, Alaska",
      "estimatedLodgingCostPerDay": 200,
      "estimatedFlightCostPerPerson": 100,
      "image": "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "man riding on kayak surrounded by mountains"
    },{
      "id": 44,
      "destination": "Caye Caulker, Belize",
      "estimatedLodgingCostPerDay": 450,
      "estimatedFlightCostPerPerson": 80,
      "image": "https://images.unsplash.com/photo-1544525977-0a3bca9e560d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      "alt": "boat on dock during daytime"
    }]
    tripRepository1.filterTrips(17)
    tripRepository1.filterApprovedTrips()
    tripRepository1.findAnnualTrips()
    tripRepository1.filterTravelersDestinations(tripRepository1.specificAnnualTrips)
    expect(tripRepository1.calculateAnnualTripCost()).to.equal() */