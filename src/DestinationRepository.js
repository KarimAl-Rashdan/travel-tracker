// import Destination from "./Destination";
class DestinationRepository {
  constructor(allDestinationData) {
    this.allDestinations = allDestinationData;
  }
  filterDestinationById(id) {
    const destination = this.allDestinations.filter(destination => destination.id === id);
    return destination[0]
  }
  filterDestinationIdByName(name) {
    const destinationId = this.allDestinations.filter(destination => destination.destination === name)
    return destinationId[0].id
  }

}
export default DestinationRepository;