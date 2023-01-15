// import Destination from "./Destination";
class DestinationRepository {
  constructor(allDestinationData) {
    this.allDestinations = allDestinationData;
  }
  filterDestinationById(id) {
    const destination = this.allDestinations.filter(destination => destination.id === id);
    return destination[0]
  }

}
export default DestinationRepository;