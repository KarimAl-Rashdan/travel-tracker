import { expect } from "chai";
import Destination from "../src/Destination";

describe("Destination", () => {
  let destination1;

  beforeEach(() => {
    destination1 = new Destination(
      {
        "id": 1,
        "destination": "Lima, Peru",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 400,
        "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt": "overview of city buildings with a clear sky"
      }
    );
  });
  it("Should be a function", () => {
    expect(Destination).to.be.a("function");
  });
  it("Should instantiate a new Destination class", () => {
    expect(destination1).to.be.an.instanceof(Destination);
  });
  it("Should hold destination data", () => {
    expect(destination1.id).to.equal(1);
    expect(destination1.destination).to.equal("Lima, Peru");
    expect(destination1.estimatedLodgingCostPerDay).to.equal(70);
    expect(destination1.estimatedFlightCostPerPerson).to.equal(400);
    expect(destination1.image).to.equal("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80");
    expect(destination1.alt).to.equal("overview of city buildings with a clear sky");
  });
});