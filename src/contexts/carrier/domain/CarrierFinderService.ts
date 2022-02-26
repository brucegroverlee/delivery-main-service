import CarrierLocation from './CarrierLocation';
import DeliveryId from './DeliveryId';
import Carrier from './Carrier';

interface CarrierFinderService {
  findAvailable(location: CarrierLocation): Promise<Carrier>;
}

export default CarrierFinderService;
