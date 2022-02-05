import EventBus from '../../shared/domain/bus/EventBus';
import Presenter from '../../shared/domain/Presenter';
import Delivery from '../domain/Delivery';
import DeliveryRepository from '../domain/DeliveryRepository';
import Location, { LocationJSON } from '../domain/Location';
import UserId from '../domain/UserId';

export interface CreateDeliveryData {
  senderId: string;
  senderLocation: LocationJSON;
  recipientId: string;
  recipientLocation: LocationJSON;
}

class CreateDelivery {
  constructor(private repository: DeliveryRepository, private eventBus: EventBus, private presenter: Presenter) {}

  async run(data: CreateDeliveryData): Promise<void> {
    const delivery = Delivery.create({
      senderId: UserId.create(data.senderId),
      senderLocation: Location.create(data.senderLocation),
      recipientId: UserId.create(data.recipientId),
      recipientLocation: Location.create(data.recipientLocation),
    });

    await this.repository.create(delivery);

    await this.eventBus.publish(delivery.getDomainEvents());

    this.presenter.returnNewEntity(delivery);
  }
}

export default CreateDelivery;
