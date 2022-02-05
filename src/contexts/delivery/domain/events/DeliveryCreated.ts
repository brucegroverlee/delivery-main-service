import DeliveryDomainEvent, { DeliveryDomainEventProperties } from './DeliveryDomainEvent';

class DeliveryCreated extends DeliveryDomainEvent {
  static readonly EVENT_NAME = 'domain_event.delivery.created';

  constructor(data: DeliveryDomainEventProperties) {
    super(DeliveryCreated.EVENT_NAME, data);
  }

  public static fromJSON(data: DeliveryDomainEventProperties): DeliveryCreated {
    return new DeliveryCreated(data);
  }
}

export default DeliveryCreated;
