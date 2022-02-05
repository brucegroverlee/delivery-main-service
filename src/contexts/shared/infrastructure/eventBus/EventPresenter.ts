/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import AggregateRoot from '../../domain/entities/AggregateRoot';
import Presenter from '../../domain/Presenter';

class EventPresenter implements Presenter {
  private eventName: string;

  constructor(eventName: string) {
    this.eventName = eventName;
  }

  // eslint-disable-next-line class-methods-use-this
  returnNewEntity(object: AggregateRoot): void {
    console.log(`The event ${this.eventName} created the new entity with ID "${object.toJSON().id}".`);
  }

  returnEntity(object: AggregateRoot): void {
    console.log(`The event ${this.eventName} returned the entity with ID "${object.toJSON().id}".`);
  }

  returnList(object: any[]): void {}

  returnEmpty(): void {
    console.log(`The event ${this.eventName} was executed.`);
  }
}

export default EventPresenter;
