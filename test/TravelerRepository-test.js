import { expect } from "chai";
import TravelerRepository from "../src/TravelerRepository";
import sampleTravelersData from "../src/data/sample-travelers";
import Traveler from "../src/Traveler";

describe("Traveler Repository", () => {
  let travelerRepository;
  
  beforeEach(() => {
    travelerRepository = new TravelerRepository(sampleTravelersData);
  });
  it("Should be a function", () => {
    expect(TravelerRepository).to.be.a("function");
  });
  it("Should instantiate a new TravelerRepository", () => {
    expect(travelerRepository).to.be.an.instanceof(TravelerRepository);
  });
  it("Should store all traveler data", () => {
    expect(travelerRepository.allTravelers).to.eql(sampleTravelersData);
  });
  it("Should find a traveler based on their id", () => {
    expect(travelerRepository.findTraveler(1)).to.equal(sampleTravelersData[0]);
  });
  it("Should update currentTraveler property", () => {
    travelerRepository.findTraveler(1);
    expect(travelerRepository.currentTraveler).to.deep.equal(sampleTravelersData[0]);
    expect(travelerRepository.currentTraveler).to.be.an.instanceOf(Traveler);
  });
});
