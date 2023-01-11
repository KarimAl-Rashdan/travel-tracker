import { expect } from "chai";
import Traveler from "../src/Traveler";

describe("Traveler", function () {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler({
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer",
    });
  });

  it("Should be a function", function() {
    expect(Traveler).to.be.a("function");
  })
})