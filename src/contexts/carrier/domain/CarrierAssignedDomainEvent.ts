import DomainEvent from '../../shared/domain/bus/DomainEvent';
import Carrier from './Carrier';

class CarrierDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'domain_event.carrier.assigned';

  readonly carrier: Carrier;

  constructor(carrier: Carrier) {
    super(CarrierDomainEvent.EVENT_NAME, carrier.id);
    this.carrier = carrier;
  }
}

export default CarrierDomainEvent;
