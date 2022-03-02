import DomainEventSubscriber from '../../../../shared/domain/bus/DomainEventSubscriber';
import EventPresenter from '../../../../shared/infrastructure/bus/EventPresenter';
import RabbitMQEventBus from '../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import deliveryDomainEventMapper from '../../DeliveryDomainEventMapper';
import UpdateAsPaid, { UpdateAsPaidData } from '../../../application/UpdateAsPaid';
import DeliveryId from '../../../domain/DeliveryId';
import deliveryMapper from '../../DeliveryMapper';
import { sequelizeDeliveryRepository } from '../../sequelize/SequelizeDeliveryRepository';
import InvoiceCreatedDomainEventDTO from './InvoiceCreatedDomainEventDTO';

class UpdateAsPaidSubscriber implements DomainEventSubscriber {
  private presenter: EventPresenter;
  private UpdateAsPaid: UpdateAsPaid;

  constructor() {
    const eventBus = new RabbitMQEventBus(deliveryDomainEventMapper);
    this.presenter = new EventPresenter(deliveryMapper);
    this.UpdateAsPaid = new UpdateAsPaid(sequelizeDeliveryRepository, eventBus, this.presenter);
  }

  subscribedTo(): string[] {
    return ['domain_event.invoice.created'];
  }

  async on(domainEventDTO: InvoiceCreatedDomainEventDTO): Promise<void> {
    this.presenter.setEventName(domainEventDTO.eventName);

    const data: UpdateAsPaidData = {
      deliveryId: DeliveryId.create(domainEventDTO.data.deliveryId),
    };

    await this.UpdateAsPaid.run(data);
  }
}

export const updateAsPaidSubscriber = new UpdateAsPaidSubscriber();

export default UpdateAsPaidSubscriber;
