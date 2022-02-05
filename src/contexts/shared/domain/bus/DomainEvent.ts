import UuidValueObject from '../valueObject/UuidValueObject';

export interface DomainEventData {
  eventId?: string;
  occurredOn?: Date;
}

abstract class DomainEvent {
  static EVENT_NAME: string;

  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(eventName: string, aggregateId: string, eventId?: string, occurredOn?: Date) {
    this.aggregateId = aggregateId;
    this.eventId = eventId || UuidValueObject.generate().value;
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }

  abstract toJSON(): Object;

  static fromJSON: (...args: any[]) => any;
}

export type DomainEventClass = {
  EVENT_NAME: string;
  fromJSON(...args: any[]): DomainEvent;
};

export default DomainEvent;
