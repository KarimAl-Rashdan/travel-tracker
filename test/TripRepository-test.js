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
  })
  it("Should be an instance of Trip Repository", () => {
    expect(tripRepository1).to.be.an.instanceof(TripRepository)
  })
  it("Should hold all trips data", () => {
    expect(tripRepository1.allTrips).to.eql(sampleTripData)
  })
  it("Should filter trips based off user id") {
    expect(tripRepository1.filterTrips())
  }
})