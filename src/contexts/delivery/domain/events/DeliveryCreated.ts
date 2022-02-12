import Delivery from '../Delivery';
import DeliveryDomainEvent from './DeliveryDomainEvent';

class DeliveryCreated extends DeliveryDomainEvent {
  static readonly EVENT_NAME = 'domain_event.delivery.created';

  constructor(delivery: Delivery) {
    super(DeliveryCreated.EVENT_NAME, delivery);
  }
}

export default DeliveryCreated;
