import Delivery from '../Delivery';
import DeliveryDomainEvent from './DeliveryDomainEvent';

class DeliveryFareAccepted extends DeliveryDomainEvent {
  static readonly EVENT_NAME = 'domain_event.delivery.fare_accepted';

  constructor(delivery: Delivery) {
    super(DeliveryFareAccepted.EVENT_NAME, delivery);
  }
}

export default DeliveryFareAccepted;
