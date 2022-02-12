import DomainEventDTO from '../../shared/infrastructure/DomainEventDTO';
import DeliveryDTO from './DeliveryDTO';

interface DeliveryDomainEventDTO extends DomainEventDTO {
  delivery: DeliveryDTO;
}

export default DeliveryDomainEventDTO;
