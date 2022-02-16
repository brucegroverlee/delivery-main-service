import Delivery from '../Delivery';
import DeliveryDomainEvent from './DeliveryDomainEvent';

class RecipientRequestRejected extends DeliveryDomainEvent {
  static readonly EVENT_NAME = 'domain_event.delivery.reject_request';

  constructor(delivery: Delivery) {
    super(RecipientRequestRejected.EVENT_NAME, delivery);
  }
}

export default RecipientRequestRejected;
