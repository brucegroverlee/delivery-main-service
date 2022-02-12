interface DomainEventDTO {
  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
}

export default DomainEventDTO;
