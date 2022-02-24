import Delivery from '../Delivery';
import DeliveryDomainEvent from './DeliveryDomainEvent';

class DeliveryStarted extends DeliveryDomainEvent {
  static readonly EVENT_NAME = 'domain_event.delivery.started';

  constructor(delivery: Delivery) {
    super(DeliveryStarted.EVENT_NAME, delivery);
  }
}

export default DeliveryStarted;
