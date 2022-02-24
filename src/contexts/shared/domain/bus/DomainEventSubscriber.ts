interface DomainEventSubscriber {
  subscribedTo(): Array<string>;
  on(domainEvent: any): Promise<void>;
}

export default DomainEventSubscriber;
