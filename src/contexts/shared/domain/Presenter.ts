/* eslint-disable no-unused-vars */
import AggregateRoot from './entities/AggregateRoot';

interface IPresenter {
  returnNewEntity(object: AggregateRoot): void;
  returnEntity(object: AggregateRoot): void;
  returnList(object: any[]): void;
  returnEmpty(): void;
}

export default IPresenter;
