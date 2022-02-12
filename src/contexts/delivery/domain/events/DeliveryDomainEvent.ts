import DomainEvent from '../../../shared/domain/bus/DomainEvent';
import Delivery from '../Delivery';

class DeliveryDomainEvent extends DomainEvent {
  readonly delivery: Delivery;

  constructor(eventName: string, delivery: Delivery, eventId?: string, occurredOn?: Date) {
    super(eventName, delivery.id, eventId, occurredOn);
    this.delivery = delivery;
  }
}

export default DeliveryDomainEvent;
