import DomainEventDTO from '../../shared/infrastructure/DomainEventDTO';
import DeliveryDTO from './DeliveryDTO';

interface DeliveryDomainEventDTO extends DomainEventDTO {
  data: DeliveryDTO;
}

export default DeliveryDomainEventDTO;
