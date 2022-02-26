import CarrierId from './CarrierId';
import Carrier from './Carrier';

interface CarrierRepository {
  add(carrier: Carrier): Promise<void>;
  getById(id: CarrierId): Promise<Carrier | null>;
  update(carrier: Carrier): Promise<void>;
}

export default CarrierRepository;
