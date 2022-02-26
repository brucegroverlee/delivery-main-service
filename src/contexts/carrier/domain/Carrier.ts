import AggregateRoot from '../../shared/domain/entities/AggregateRoot';
import CarrierId from './CarrierId';
import CarrierStatus from './CarrierStatus';
import CarrierLocation from './CarrierLocation';
import DeliveryId from './DeliveryId';
import CarrierAssignedDomainEvent from './CarrierAssignedDomainEvent';

interface CarrierProps {
  id: CarrierId;
  status: CarrierStatus;
  location: CarrierLocation | null;
  deliveryId: DeliveryId | null;
}

class Carrier extends AggregateRoot {
  readonly id: CarrierId;
  private _status: CarrierStatus;
  private _location: CarrierLocation | null;
  private _deliveryId: DeliveryId | null;

  constructor(data: CarrierProps) {
    super();
    this.id = data.id;
    this._status = data.status;
    this._location = data.location;
    this._deliveryId = data.deliveryId;
  }

  public get status(): CarrierStatus {
    return this._status;
  }

  public get location(): CarrierLocation | null {
    return this._location;
  }

  public get deliveryId(): DeliveryId | null {
    return this._deliveryId;
  }

  public static create(): Carrier {
    const carrier = new Carrier({
      id: CarrierId.generate(),
      status: CarrierStatus.IDLE,
      location: null,
      deliveryId: null,
    });

    return carrier;
  }

  public assignDelivery(deliveryId: DeliveryId) {
    this._status = CarrierStatus.ASSIGNED;

    this._deliveryId = deliveryId;

    this.addDomainEvent(new CarrierAssignedDomainEvent(this));
  }

  public changeStatusToIdle() {
    this._status = CarrierStatus.IDLE;

    this._deliveryId = null;
  }

  public updateLocation(location: CarrierLocation) {
    this._location = location;
  }
}

export default Carrier;
