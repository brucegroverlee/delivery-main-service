import DomainEventDTO from '../../shared/infrastructure/DomainEventDTO';
import CarrierDTO from './CarrierDTO';

interface CarrierDomainEventDTO extends DomainEventDTO {
  data: CarrierDTO;
}

export default CarrierDomainEventDTO;
