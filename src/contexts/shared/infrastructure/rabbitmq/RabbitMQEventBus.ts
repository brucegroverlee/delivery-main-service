import DomainEvent from '../../domain/bus/DomainEvent';
import DomainEventSubscriber from '../../domain/bus/DomainEventSubscriber';
import EventBus from '../../domain/bus/EventBus';
import { rabbitmqApp } from '../../../../infrastructure/rabbitmq/RabbitmqApp';
import DTOMapper from '../DTOMapper';

class RabbitMQEventBus implements EventBus {
  constructor(private domainEventMapper: DTOMapper) {}

  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach((event) => {
      rabbitmqApp.publish(event.eventName, this.domainEventMapper.fromDomain(event).toDTO());
    });
  }

  static addSubscribers(subscribers: DomainEventSubscriber[]): void {
    subscribers.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((domainEvent) => {
        rabbitmqApp.subscribe(domainEvent, subscriber.on.bind(subscriber));
      });
    });
  }
}

// export const rabbitMQEventBus = new RabbitMQEventBus(rabbitmqApp);

export default RabbitMQEventBus;
