import Destination from "./Destination";
class DestinationRepository {
  constructor(allDestinationData) {
    this.allDestinations = allDestinationData;
    this.currentDestinations;
  filterDestinationById(id) {
    const destination = this.allDestinations.filter(destination => destination.id === id);
    this.currentDestinations = new Destination(destination[0])
    return destination[0]
  }
}

export default DestinationRepository;