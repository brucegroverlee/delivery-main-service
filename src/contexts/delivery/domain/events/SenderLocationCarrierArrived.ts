import Delivery from '../Delivery';
import DeliveryDomainEvent from './DeliveryDomainEvent';

class SenderLocationCarrierArrived extends DeliveryDomainEvent {
  static readonly EVENT_NAME = 'domain_event.delivery.carrier_arrived_sender_location';

  constructor(delivery: Delivery) {
    super(SenderLocationCarrierArrived.EVENT_NAME, delivery);
  }
}

export default SenderLocationCarrierArrived;
