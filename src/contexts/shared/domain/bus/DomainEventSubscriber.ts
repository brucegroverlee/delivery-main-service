/* eslint-disable no-unused-vars */
import DomainEvent, { DomainEventClass } from './DomainEvent';

interface IDomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<DomainEventClass>;

  on(domainEvent: T): Promise<void>;
}

export default IDomainEventSubscriber;
