import { expect } from "chai";
import Trip from "../src/Trip";

describe("Trip", () => {
  let trip21;

  beforeEach(() => {
    trip21 = new Trip(
      {
        "id": 21,
        "userID": 12,
        "destinationID": 10,
        "travelers": 1,
        "date": "2022/01/28",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []
      }
    );
  });
  it("Should be a function", () => {
    expect(Trip).to.be.a("function");
  });
  it("Should instantiate a new Trip class", () => {
    expect(trip21).to.be.an.instanceof(Trip);
  });
  it("Should hold all trip data", () => {
    expect(trip21.id).to.equal(21);
    expect(trip21.userID).to.equal(12);
    expect(trip21.destinationID).to.equal(10);
    expect(trip21.travelers).to.equal(1);
    expect(trip21.date).to.equal("2022/01/28");
    expect(trip21.duration).to.equal(18);
    expect(trip21.status).to.equal("approved");
    expect(trip21.suggestedActivities).to.eql([]);
  });
});