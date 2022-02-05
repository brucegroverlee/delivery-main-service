import DomainEvent from '../../domain/bus/DomainEvent';
import EventEmitterBus from './EventEmitterBus';
import DomainEventSubscriber from '../../domain/bus/DomainEventSubscriber';
import EventBus from '../../domain/bus/EventBus';

class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus;

  constructor(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus = new EventEmitterBus(subscribers);
  }

  async publish(events: DomainEvent[]): Promise<void> {
    this.bus.publish(events);
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus.registerSubscribers(subscribers);
  }
}

export default InMemoryAsyncEventBus;
