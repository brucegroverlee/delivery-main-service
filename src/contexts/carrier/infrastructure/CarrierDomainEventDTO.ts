import DomainEventDTO from '../../shared/infrastructure/DomainEventDTO';
import CarrierDTO from './CarrierDTO';

interface CarrierDomainEventDTO extends DomainEventDTO {
  carrier: CarrierDTO;
}

export default CarrierDomainEventDTO;
