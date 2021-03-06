import DomainEventDTO from '../../../../shared/infrastructure/DomainEventDTO';

interface CarrierDTO {
  id: string;
  deliveryId: string;
}

interface CarrierAssignedDomainEventDTO extends DomainEventDTO {
  data: CarrierDTO;
}

export default CarrierAssignedDomainEventDTO;
