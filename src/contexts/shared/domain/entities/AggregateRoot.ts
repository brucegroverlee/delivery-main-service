import DomainEvent from '../bus/DomainEvent';

abstract class AggregateRoot {
  private domainEvents: Array<DomainEvent>;

  constructor() {
    this.domainEvents = [];
  }

  public getDomainEvents(): Array<DomainEvent> {
    return this.domainEvents;
  }

  protected addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public abstract toJSON(): any;

  // abstract fromJSON(data: any): AggregateRoot;
}

export default AggregateRoot;
