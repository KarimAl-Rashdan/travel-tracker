import { expect } from "chai";
import TripRepository from "../src/TripRepository"
import sampleTripData from "../src/data/sample-trips"

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
        }
    ];
    tripRepository1.filterTrips(17)
    expect(tripRepository1.filterPastTrips("2020/06/01")).to.eql(traveler17PastTrips)
  });
  
})