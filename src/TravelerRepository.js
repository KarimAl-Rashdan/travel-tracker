import Traveler from "./Traveler"

class TravelerRepository {
  constructor(allTravelerData) {
    this.allTravelers = allTravelerData;
    this.currentTraveler = null;
  }
  findTraveler(id) {
    const currentTraveler = this.allTravelers.find(traveler => traveler.id === id);
    this.currentTraveler = new Traveler(currentTraveler);
    return currentTraveler;
  }
}

export default TravelerRepository;