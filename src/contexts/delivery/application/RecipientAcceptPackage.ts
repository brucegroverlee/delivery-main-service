import EventBus from '../../shared/domain/bus/EventBus';
import Presenter from '../../shared/domain/Presenter';
import DeliveryId from '../domain/DeliveryId';
import DeliveryRepository from '../domain/DeliveryRepository';

export interface RecipientAcceptPackageData {
  deliveryId: DeliveryId;
}

class RecipientAcceptPackage {
  constructor(private repository: DeliveryRepository, private eventBus: EventBus, private presenter: Presenter) {}

  async run(data: RecipientAcceptPackageData): Promise<void> {
    const { deliveryId } = data;

    const delivery = await this.repository.getById(deliveryId);

    if (!delivery) throw new Error(`There is not a Delivery entity with id ${deliveryId.value}`);

    delivery.setRecipientAcceptedPackage();

    await this.repository.update(delivery);

    await this.eventBus.publish(delivery.getDomainEvents());

    this.presenter.returnEntity(delivery);
  }
}

export default RecipientAcceptPackage;
