import DomainEventDTO from '../../../../shared/infrastructure/DomainEventDTO';

interface InvoiceDTO {
  id: string;
  deliveryId: string;
  userId: string;
}

interface InvoiceCreatedDomainEventDTO extends DomainEventDTO {
  invoice: InvoiceDTO;
}

export default InvoiceCreatedDomainEventDTO;
