import Delivery from '../Delivery';
import DeliveryDomainEvent from './DeliveryDomainEvent';

class DeliveryFareRejected extends DeliveryDomainEvent {
  static readonly EVENT_NAME = 'domain_event.delivery.fare_rejected';

  constructor(delivery: Delivery) {
    super(DeliveryFareRejected.EVENT_NAME, delivery);
  }
}

export default DeliveryFareRejected;
