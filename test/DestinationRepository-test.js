import { expect } from "chai";
import DestinationRepository from "../src/DestinationRepository"
import sampleDestinationData from "../src/data/sample-destinations"

describe("Destination Repository", () => {
  let destinationRepository1;

  beforeEach(() => {
    destinationRepository1 = new DestinationRepository(sampleDestinationData);
  });
  it("Should be a function", () => {
    expect(DestinationRepository).to.be.a("function");
  });
  it("Should hold all destination data", () => {
    expect(destinationRepository1.allDestinations).to.eql(sampleDestinationData)
  })
});