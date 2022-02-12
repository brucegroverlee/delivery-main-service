import DomainEvent from '../../domain/bus/DomainEvent';
import IDomainEventSubscriber from '../../domain/bus/DomainEventSubscriber';
import EventBus from '../../domain/bus/EventBus';
import RabbitmqApp, { rabbitmqApp } from '../../../../infrastructure/rabbitmq/RabbitmqApp';
import deliveryDomainEventMapper from '../../../delivery/infrastructure/DeliveryDomainEventMapper';

class RabbitMQEventBus implements EventBus {
  constructor(private mq: RabbitmqApp) {}

  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach((event) => {
      this.mq.publish(event.eventName, deliveryDomainEventMapper.fromDomain(event).toDTO());
    });
  }

  addSubscribers(subscribers: IDomainEventSubscriber<DomainEvent>[]): void {
    // TO-DO
    console.log(subscribers);
  }
}

export const rabbitMQEventBus = new RabbitMQEventBus(rabbitmqApp);

export default RabbitMQEventBus;
