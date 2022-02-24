import Delivery from '../Delivery';
import DeliveryDomainEvent from './DeliveryDomainEvent';

class RecipientLocationCarrierArrived extends DeliveryDomainEvent {
  static readonly EVENT_NAME = 'domain_event.delivery.carrier_arrived_recipient_location';

  constructor(delivery: Delivery) {
    super(RecipientLocationCarrierArrived.EVENT_NAME, delivery);
  }
}

export default RecipientLocationCarrierArrived;
