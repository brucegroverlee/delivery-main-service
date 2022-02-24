import DomainEvent from '../../domain/bus/DomainEvent';
import DomainEventSubscriber from '../../domain/bus/DomainEventSubscriber';
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

  addSubscribers(subscribers: DomainEventSubscriber[]): void {
    subscribers.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((domainEvent) => {
        this.mq.subscribe(domainEvent, subscriber.on.bind(subscriber));
      });
    });
  }
}

export const rabbitMQEventBus = new RabbitMQEventBus(rabbitmqApp);

export default RabbitMQEventBus;
