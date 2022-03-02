import DomainEvent from '../../../shared/domain/bus/DomainEvent';
import Delivery from '../Delivery';

class DeliveryDomainEvent extends DomainEvent {
  readonly data: Delivery;

  constructor(eventName: string, delivery: Delivery, eventId?: string, occurredOn?: Date) {
    super(eventName, delivery.id, eventId, occurredOn);
    this.data = delivery;
  }
}

export default DeliveryDomainEvent;
