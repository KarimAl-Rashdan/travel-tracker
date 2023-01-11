import { expect } from "chai";
import TravelerRepository from "../src/TravelerRepository";
import sampleTravelersData from "../src/data/sample-travelers";
import Traveler from "../src/Traveler";

describe("Traveler Repository", () => {
  let travelerRepository1;
  
  beforeEach(() => {
    travelerRepository1 = new TravelerRepository(sampleTravelersData);
  });
  it("Should be a function", () => {
    expect(TravelerRepository).to.be.a("function");
  });
  it("Should instantiate a new TravelerRepository", () => {
    expect(travelerRepository1).to.be.an.instanceof(TravelerRepository);
  });
  it("Should store all traveler data", () => {
    expect(travelerRepository1.allTravelers).to.eql(sampleTravelersData);
  });
  it("Should find a traveler based on their id", () => {
    expect(travelerRepository1.findTraveler(1)).to.equal(sampleTravelersData[0]);
  });
  it("Should update currentTraveler property", () => {
    travelerRepository1.findTraveler(1);
    expect(travelerRepository1.currentTraveler).to.deep.equal(sampleTravelersData[0]);
    expect(travelerRepository1.currentTraveler).to.be.an.instanceOf(Traveler);
  });
});
