import DomainEventSubscriber from '../../../../shared/domain/bus/DomainEventSubscriber';
import EventPresenter from '../../../../shared/infrastructure/bus/EventPresenter';
import RabbitMQEventBus from '../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import AssignCarrierId, { AssignCarrierIdData } from '../../../application/AssignCarrierId';
import CarrierId from '../../../domain/CarrierId';
import DeliveryId from '../../../domain/DeliveryId';
import deliveryDomainEventMapper from '../../DeliveryDomainEventMapper';
import deliveryMapper from '../../DeliveryMapper';
import { sequelizeDeliveryRepository } from '../../sequelize/SequelizeDeliveryRepository';
import CarrierAssignedDomainEventDTO from './CarrierAssignedDomainEventDTO';

class AssignCarrierIdSubscriber implements DomainEventSubscriber {
  private presenter: EventPresenter;
  private assignCarrierId: AssignCarrierId;

  constructor() {
    const eventBus = new RabbitMQEventBus(deliveryDomainEventMapper);
    this.presenter = new EventPresenter(deliveryMapper);
    this.assignCarrierId = new AssignCarrierId(sequelizeDeliveryRepository, eventBus, this.presenter);
  }

  subscribedTo(): string[] {
    return ['domain_event.carrier.assigned'];
  }

  async on(domainEventDTO: CarrierAssignedDomainEventDTO): Promise<void> {
    this.presenter.setEventName(domainEventDTO.eventName);

    const data: AssignCarrierIdData = {
      deliveryId: DeliveryId.create(domainEventDTO.data.deliveryId),
      carrierId: CarrierId.create(domainEventDTO.aggregateId),
    };

    await this.assignCarrierId.run(data);
  }
}

export const assignCarrierIdSubscriber = new AssignCarrierIdSubscriber();

export default AssignCarrierIdSubscriber;
