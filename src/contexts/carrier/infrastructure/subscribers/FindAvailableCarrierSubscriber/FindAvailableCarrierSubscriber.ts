import DomainEventSubscriber from '../../../../shared/domain/bus/DomainEventSubscriber';
import EventPresenter from '../../../../shared/infrastructure/bus/EventPresenter';
import { rabbitMQEventBus } from '../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import FindAvailableCarrier, {
  FindAvailableCarrierData,
} from '../../../application/findAvailableCarrier/FindAvailableCarrier';
import CarrierLocation from '../../../domain/CarrierLocation';
import DeliveryId from '../../../domain/DeliveryId';
import carrierMapper from '../../CarrierMapper';
import { sequelizeCarrierFinderService } from '../../sequelize/SequelizeCarrierFinderService';
import { sequelizeCarrierRepository } from '../../sequelize/SequelizeCarrierRepository';
import DeliveryDomainEventDTO from './DeliveryDomainEventDTO';

class FindAvailableCarrierSubscriber implements DomainEventSubscriber {
  private presenter: EventPresenter;
  private findAvailableCarrier: FindAvailableCarrier;

  constructor() {
    this.presenter = new EventPresenter(carrierMapper);
    this.findAvailableCarrier = new FindAvailableCarrier(
      sequelizeCarrierFinderService,
      sequelizeCarrierRepository,
      rabbitMQEventBus,
      this.presenter,
    );
  }

  subscribedTo(): string[] {
    return ['domain_event.delivery.fare_accepted'];
  }

  async on(domainEventDTO: DeliveryDomainEventDTO): Promise<void> {
    this.presenter.setEventName(domainEventDTO.eventName);

    const data: FindAvailableCarrierData = {
      deliveryId: DeliveryId.create(domainEventDTO.aggregateId),
      location: CarrierLocation.create(domainEventDTO.delivery.senderLocation),
    };

    await this.findAvailableCarrier.run(data);
  }
}

export const findAvailableCarrierSubscriber = new FindAvailableCarrierSubscriber();

export default FindAvailableCarrierSubscriber;
