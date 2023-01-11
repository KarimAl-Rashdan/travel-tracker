import { expect } from "chai";
import Traveler from "../src/Traveler";

describe("Traveler", () => {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler({
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer",
    });
  });
  it("Should be a function", () => {
    expect(Traveler).to.be.a("function");
  });
  it("Should instantiate a new Traveler", () => {
    expect(traveler).to.be.an.instanceof(Traveler);
    expect(traveler.id).to.equal(1);
    expect(traveler.name).to.equal("Ham Leadbeater");
    expect(traveler.travelerType).to.equal("relaxer");
  });
})