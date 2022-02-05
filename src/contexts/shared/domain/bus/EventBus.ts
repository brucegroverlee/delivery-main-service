/* eslint-disable no-unused-vars */
import DomainEvent from './DomainEvent';
import DomainEventSubscriber from './DomainEventSubscriber';

interface EventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void;
}

export default EventBus;
