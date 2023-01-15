import { expect } from "chai";
import DestinationRepository from "../src/DestinationRepository"
import sampleDestinationData from "../src/data/sample-destinations"

describe("Destination Repository", () => {
  let destinationRepository1;
  let destination1

  beforeEach(() => {
    destinationRepository1 = new DestinationRepository(sampleDestinationData);
    destination1 = sampleDestinationData[0]
  });
  it("Should be a function", () => {
    expect(DestinationRepository).to.be.a("function");
  });
  it("Should hold all destination data", () => {
    expect(destinationRepository1.allDestinations).to.eql(sampleDestinationData)
  })
  it("Should return a destination based off an id", () => {
    expect(destinationRepository1.filterDestinationById(destination1.id)).to.equal(sampleDestinationData[0])
  })
  it("Should return destination id based off of name", () => {
    expect(destinationRepository1.filterDestinationIdByName("Stockholm, Sweden")).to.equal(2)
  })
});