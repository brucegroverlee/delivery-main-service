import DomainEventDTO from '../../../../shared/infrastructure/DomainEventDTO';

interface DeliveryDTO {
  id: string;
  senderLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
}

interface DeliveryDomainEventDTO extends DomainEventDTO {
  data: DeliveryDTO;
}

export default DeliveryDomainEventDTO;
