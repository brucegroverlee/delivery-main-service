interface DomainEventDTO {
  readonly eventName: string;
  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
}

export default DomainEventDTO;
