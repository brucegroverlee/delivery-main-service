/* eslint-disable array-callback-return */
/* eslint-disable import/order */
import DomainEvent from '../../domain/bus/DomainEvent';
import { EventEmitter } from 'events';
import DomainEventSubscriber from '../../domain/bus/DomainEventSubscriber';

class EventEmitterBus extends EventEmitter {
  constructor(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    super();

    this.registerSubscribers(subscribers);
  }

  registerSubscribers(subscribers?: DomainEventSubscriber<DomainEvent>[]) {
    subscribers?.map((subscriber) => {
      this.registerSubscriber(subscriber);
    });
  }

  private registerSubscriber(subscriber: DomainEventSubscriber<DomainEvent>) {
    subscriber.subscribedTo().map((event) => {
      this.on(event.EVENT_NAME, subscriber.on);
    });
  }

  publish(events: DomainEvent[]): void {
    events.map((event) => this.emit(event.eventName, event));
  }
}

export default EventEmitterBus;
