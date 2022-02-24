import EventBus from '../../shared/domain/bus/EventBus';
import Presenter from '../../shared/domain/Presenter';
import CarrierId from '../domain/CarrierId';
import DeliveryId from '../domain/DeliveryId';
import DeliveryRepository from '../domain/DeliveryRepository';

export interface AssignCarrierIdData {
  deliveryId: DeliveryId;
  carrierId: CarrierId;
}

class AssignCarrierId {
  constructor(private repository: DeliveryRepository, private eventBus: EventBus, private presenter: Presenter) {}

  async run(data: AssignCarrierIdData): Promise<void> {
    const { deliveryId, carrierId } = data;

    const delivery = await this.repository.getById(deliveryId);

    if (!delivery) throw new Error(`There is not a Delivery entity with id ${deliveryId.value}`);

    delivery.assignCarrier(carrierId);

    await this.repository.update(delivery);

    await this.eventBus.publish(delivery.getDomainEvents());

    this.presenter.returnEntity(delivery);
  }
}

export default AssignCarrierId;
