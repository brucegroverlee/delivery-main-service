import UuidValueObject from '../valueObject/UuidValueObject';

abstract class DomainEvent {
  static EVENT_NAME: string;

  readonly aggregateId: UuidValueObject;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(eventName: string, aggregateId: UuidValueObject, eventId?: string, occurredOn?: Date) {
    this.aggregateId = aggregateId;
    this.eventId = eventId || UuidValueObject.generate().value;
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }
}

export type DomainEventClass = {
  EVENT_NAME: string;
  fromJSON(...args: any[]): DomainEvent;
};

export default DomainEvent;
