import DomainEvent from '../../shared/domain/bus/DomainEvent';
import Carrier from './Carrier';

class CarrierDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'domain_event.carrier.assigned';

  readonly data: Carrier;

  constructor(carrier: Carrier) {
    super(CarrierDomainEvent.EVENT_NAME, carrier.id);
    this.data = carrier;
  }
}

export default CarrierDomainEvent;
