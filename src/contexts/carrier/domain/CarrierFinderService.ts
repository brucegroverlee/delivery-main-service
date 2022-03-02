import CarrierLocation from './CarrierLocation';
import Carrier from './Carrier';

interface CarrierFinderService {
  findAvailable(location: CarrierLocation): Promise<Carrier | null>;
}

export default CarrierFinderService;
