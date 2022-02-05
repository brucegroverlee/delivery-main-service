import DomainEvent, { DomainEventData } from '../../../shared/domain/bus/DomainEvent';

export interface LocationJSON {
  address: string;
  latitude: number;
  longitude: number;
}

export interface DeliveryDomainEventProperties extends DomainEventData {
  aggregateId: string;
  senderId: string;
  senderLocation: LocationJSON;
  recipientId: string;
  recipientLocation: LocationJSON;
  status: number;
  fare: number | null;
  carrierId: string | null;
  startedTime: string | null;
  completedTime: string | null;
}

class DeliveryDomainEvent extends DomainEvent {
  readonly senderId: string;
  readonly senderLocation: LocationJSON;
  readonly recipientId: string;
  readonly recipientLocation: LocationJSON;
  readonly status: number;
  readonly fare: number | null;
  readonly carrierId: string | null;
  readonly startedTime: string | null;
  readonly completedTime: string | null;

  constructor(eventName: string, data: DeliveryDomainEventProperties) {
    super(eventName, data.aggregateId, data.eventId, data.occurredOn);
    this.senderId = data.senderId;
    this.senderLocation = data.senderLocation;
    this.recipientId = data.recipientId;
    this.recipientLocation = data.recipientLocation;
    this.status = data.status;
    this.fare = data.fare;
    this.carrierId = data.carrierId;
    this.startedTime = data.startedTime;
    this.completedTime = data.completedTime;
  }

  public toJSON(): DeliveryDomainEventProperties {
    return {
      aggregateId: this.aggregateId,
      senderId: this.senderId,
      senderLocation: this.senderLocation,
      recipientId: this.recipientId,
      recipientLocation: this.recipientLocation,
      status: this.status,
      fare: this.fare,
      carrierId: this.carrierId,
      startedTime: this.startedTime,
      completedTime: this.completedTime,
      eventId: this.eventId,
      occurredOn: this.occurredOn,
    };
  }
}

export default DeliveryDomainEvent;
