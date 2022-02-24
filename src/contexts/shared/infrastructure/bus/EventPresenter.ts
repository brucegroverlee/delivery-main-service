import debug from 'debug';
import AggregateRoot from '../../domain/entities/AggregateRoot';
import Presenter from '../../domain/Presenter';
import DTOMapper from '../DTOMapper';

const logger = debug('server:infrastructure:EventPresenter');

class EventPresenter implements Presenter {
  private dtoMapper: DTOMapper | null;
  private eventName: string | null;

  constructor(dtoMapper: DTOMapper | null = null) {
    this.dtoMapper = dtoMapper;
    this.eventName = null;
  }

  public setEventName(eventName: string): void {
    this.eventName = eventName;
  }

  returnNewEntity(object: AggregateRoot): void {
    logger(
      `The event ${this.eventName} created the new entity with ID "${JSON.stringify(
        this.dtoMapper!.fromDomain(object).toDTO(),
      )}".`,
    );
  }

  returnEntity(object: AggregateRoot): void {
    logger(
      `The event ${this.eventName} returned the new entity with ID "${JSON.stringify(
        this.dtoMapper!.fromDomain(object).toDTO(),
      )}".`,
    );
  }

  returnList(objects: any[]): void {
    logger(`The event ${this.eventName} returned a list.`);
  }

  returnEmpty(): void {
    logger(`The event ${this.eventName} was executed.`);
  }
}

export default EventPresenter;
