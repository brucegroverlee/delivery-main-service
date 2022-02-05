import AggregateRoot from '../../shared/domain/entities/AggregateRoot';
import DeliveryId from './DeliveryId';
import UserId from './UserId';
import Location, { LocationJSON } from './Location';
import DeliveryStatus from './DeliveryStatus';
import DeliveryFare from './DeliveryFare';
import CarrierId from './CarrierId';
import DeliveryCreated from './events/DeliveryCreated';
import DeliveryFareCalculated from './events/DeliveryFareCalculated';

export interface DeliveryJSON {
  id: string;
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

interface DeliveryProperties {
  id: DeliveryId;
  senderId: UserId;
  senderLocation: Location;
  recipientId: UserId;
  recipientLocation: Location;
  status: DeliveryStatus;
  fare: DeliveryFare | null;
  carrierId: CarrierId | null;
  startedTime: Date | null;
  completedTime: Date | null;
}

class Delivery extends AggregateRoot {
  readonly id: DeliveryId;
  readonly senderId: UserId;
  readonly senderLocation: Location;
  readonly recipientId: UserId;
  private _recipientLocation: Location;
  private _status: DeliveryStatus;
  private _fare: DeliveryFare | null;
  private _carrierId: CarrierId | null;
  private _startedTime: Date | null;
  private _completedTime: Date | null;

  private constructor(data: DeliveryProperties) {
    super();
    this.id = data.id;
    this.senderId = data.senderId;
    this.senderLocation = data.senderLocation;
    this.recipientId = data.recipientId;
    this._recipientLocation = data.recipientLocation;
    this._status = data.status;
    this._fare = data.fare;
    this._carrierId = data.carrierId;
    this._startedTime = data.startedTime;
    this._completedTime = data.completedTime;
  }

  public get recipientLocation(): Location {
    return this._recipientLocation;
  }

  public get status(): DeliveryStatus {
    return this._status;
  }

  public get fare(): DeliveryFare | null {
    return this._fare;
  }

  public get carrierId(): CarrierId | null {
    return this._carrierId;
  }

  public get startedTime(): Date | null {
    return this._startedTime;
  }

  public get completedTime(): Date | null {
    return this._completedTime;
  }

  public static create(
    data: Omit<DeliveryProperties, 'id' | 'status' | 'fare' | 'carrierId' | 'startedTime' | 'completedTime'>,
  ): Delivery {
    const delivery = new Delivery({
      ...data,
      id: DeliveryId.generate(),
      status: DeliveryStatus.CREATED,
      fare: null,
      carrierId: null,
      startedTime: null,
      completedTime: null,
    });

    delivery.addDomainEvent(
      new DeliveryCreated({
        aggregateId: delivery.id.value,
        ...delivery.toJSON(),
      }),
    );

    return delivery;
  }

  /* public acceptRequest(recipientLocation: Location) {
    this.status = DeliveryStatus.ACCEPTED_BY_RECIPIENT;

    this._recipientLocation = recipientLocation;

    this.fare = DeliveryFare.calculateBy(this.senderLocation, this._recipientLocation);

    // this.addDomainEvent(new DeliveryFareCalculated())
  } */

  public toJSON(): DeliveryJSON {
    return {
      id: this.id.value,
      senderId: this.senderId.value,
      senderLocation: { ...this.senderLocation },
      recipientId: this.recipientId.value,
      recipientLocation: { ...this.recipientLocation },
      status: this.status,
      fare: this.fare ? this.fare.value : null,
      carrierId: this.carrierId ? this.carrierId.value : null,
      startedTime: this.startedTime ? this.startedTime.toString() : null,
      completedTime: this.completedTime ? this.completedTime.toString() : null,
    };
  }

  public static fromJSON(data: DeliveryJSON): Delivery {
    return new Delivery({
      id: DeliveryId.create(data.id),
      senderId: UserId.create(data.senderId),
      senderLocation: Location.create(data.senderLocation),
      recipientId: UserId.create(data.recipientId),
      recipientLocation: Location.create(data.recipientLocation),
      status: data.status,
      fare: data.fare ? new DeliveryFare(data.fare) : null,
      carrierId: data.carrierId ? CarrierId.create(data.carrierId) : null,
      startedTime: data.startedTime ? new Date(data.startedTime) : null,
      completedTime: data.completedTime ? new Date(data.completedTime) : null,
    });
  }
}

export default Delivery;
