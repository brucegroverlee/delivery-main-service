/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import DomainEvent, { DomainEventClass } from '../../domain/bus/DomainEvent';

import DomainEventSubscriber from '../../domain/bus/DomainEventSubscriber';

type Mapping = Map<string, DomainEventClass>;

class DomainEventMapping {
  mapping: Mapping;

  constructor(mapping: DomainEventSubscriber<DomainEvent>[]) {
    this.mapping = mapping.reduce(this.eventsExtractor(), new Map<string, DomainEventClass>());
  }

  private eventsExtractor() {
    return (map: Mapping, subscriber: DomainEventSubscriber<DomainEvent>) => {
      subscriber.subscribedTo().forEach(this.eventNameExtractor(map));

      return map;
    };
  }

  private eventNameExtractor(map: Mapping): (domainEvent: DomainEventClass) => void {
    return (domainEvent) => {
      const eventName = domainEvent.EVENT_NAME;
      map.set(eventName, domainEvent);
    };
  }

  for(name: string): DomainEventClass {
    const domainEvent = this.mapping.get(name);

    if (!domainEvent) {
      throw new Error(`The Domain Event Class for ${name} doesn't exists or have no subscribers`);
    }

    return domainEvent;
  }
}

export default DomainEventMapping;
