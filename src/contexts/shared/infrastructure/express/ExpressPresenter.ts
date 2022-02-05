import AggregateRoot from '../../domain/entities/AggregateRoot';
import Presenter from '../../domain/Presenter';
/* eslint-disable import/order */
import { Response } from 'express';

class ExpressPresenter implements Presenter {
  private response: Response | null;

  constructor(response: Response | null = null) {
    this.response = response;
  }

  public setResponse(response: Response): void {
    this.response = response;
  }

  returnNewEntity(object: AggregateRoot): void {
    this.response!.status(201).json(object.toJSON());
  }

  returnEntity(object: AggregateRoot): void {
    this.response!.status(200).json(object.toJSON());
  }

  returnList(object: any[]): void {
    this.response!.status(202).json(object);
  }

  returnEmpty(): void {
    this.response!.status(204).send();
  }
}

export default ExpressPresenter;
