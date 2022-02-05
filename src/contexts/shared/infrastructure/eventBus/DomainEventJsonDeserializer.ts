import DomainEvent from '../../domain/bus/DomainEvent';
import DomainEventMapping from './DomainEventMapping';

class DomainEventJsonDeserializer {
  private mapping: DomainEventMapping;

  constructor(mapping: DomainEventMapping) {
    this.mapping = mapping;
  }

  deserialize(event: string): DomainEvent {
    const eventData = JSON.parse(event).data;
    const eventName = eventData.type;
    const eventClass = this.mapping.for(eventName);

    if (!eventClass) {
      throw new Error(`The event ${eventName} doesn't exist or has no subscribers`);
    }

    return eventClass.fromJSON(
      eventData.attributes.id,
      eventData.attributes,
      eventData.id,
      eventData.occurred_on,
    );
  }
}

export default DomainEventJsonDeserializer;
