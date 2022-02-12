import EventBus from '../../shared/domain/bus/EventBus';
import Presenter from '../../shared/domain/Presenter';
import DeliveryFareCalculatorService from '../domain/DeliveryFareCalculatorService';
import DeliveryId from '../domain/DeliveryId';
import DeliveryRepository from '../domain/DeliveryRepository';
import Location from '../domain/Location';

export interface RecipientAcceptRequestData {
  deliveryId: DeliveryId;
  recipientLocation: Location;
}

class RecipientAcceptRequest {
  constructor(
    private deliveryFareCalculatorService: DeliveryFareCalculatorService,
    private repository: DeliveryRepository,
    private eventBus: EventBus,
    private presenter: Presenter,
  ) {}

  async run(data: RecipientAcceptRequestData): Promise<void> {
    const { deliveryId, recipientLocation } = data;

    const delivery = await this.repository.getById(deliveryId);

    if (!delivery) throw new Error(`There is not a Delivery entity with id ${deliveryId.value}`);

    const deliveryFare = await this.deliveryFareCalculatorService.calculateBy(
      delivery.senderLocation,
      recipientLocation,
    );

    delivery.acceptRequest(recipientLocation, deliveryFare);

    await this.repository.update(delivery);

    await this.eventBus.publish(delivery.getDomainEvents());

    this.presenter.returnEntity(delivery);
  }
}

export default RecipientAcceptRequest;
