import Delivery from '../Delivery';
import DeliveryDomainEvent from './DeliveryDomainEvent';

class DeliveryFareCalculated extends DeliveryDomainEvent {
  static readonly EVENT_NAME = 'domain_event.delivery.fare_calculated';

  constructor(delivery: Delivery) {
    super(DeliveryFareCalculated.EVENT_NAME, delivery);
  }
}

export default DeliveryFareCalculated;
