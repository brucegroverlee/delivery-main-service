import Delivery from './Delivery';
import DeliveryId from './DeliveryId';

interface DeliveryRepository {
  create(delivery: Delivery): Promise<void>;
  getById(id: DeliveryId): Promise<Delivery | null>;
  update(delivery: Delivery): Promise<void>;
}

export default DeliveryRepository;
