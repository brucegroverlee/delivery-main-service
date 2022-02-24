import EventBus from '../../shared/domain/bus/EventBus';
import Presenter from '../../shared/domain/Presenter';
import DeliveryId from '../domain/DeliveryId';
import DeliveryRepository from '../domain/DeliveryRepository';

export interface CarrierArriveRecipientLocationData {
  deliveryId: DeliveryId;
}

class CarrierArriveRecipientLocation {
  constructor(private repository: DeliveryRepository, private eventBus: EventBus, private presenter: Presenter) {}

  async run(data: CarrierArriveRecipientLocationData): Promise<void> {
    const { deliveryId } = data;

    const delivery = await this.repository.getById(deliveryId);

    if (!delivery) throw new Error(`There is not a Delivery entity with id ${deliveryId.value}`);

    delivery.setCarrierArrivedRecipientLocation();

    await this.repository.update(delivery);

    await this.eventBus.publish(delivery.getDomainEvents());

    this.presenter.returnEntity(delivery);
  }
}

export default CarrierArriveRecipientLocation;
