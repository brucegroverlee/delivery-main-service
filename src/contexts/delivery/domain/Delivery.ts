import AggregateRoot from '../../shared/domain/entities/AggregateRoot';
import DeliveryId from './DeliveryId';
import UserId from './UserId';
import Location from './Location';
import DeliveryStatus from './DeliveryStatus';
import DeliveryFare from './DeliveryFare';
import CarrierId from './CarrierId';
import DeliveryCreated from './events/DeliveryCreated';
import DeliveryFareCalculated from './events/DeliveryFareCalculated';

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

  constructor(data: DeliveryProperties) {
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

    delivery.addDomainEvent(new DeliveryCreated(delivery));

    return delivery;
  }

  public acceptRequest(recipientLocation: Location, deliveryFare: DeliveryFare) {
    this._status = DeliveryStatus.ACCEPTED_BY_RECIPIENT;

    this._recipientLocation = recipientLocation;

    this._fare = deliveryFare;

    this.addDomainEvent(new DeliveryFareCalculated(this));
  }
}

export default Delivery;
