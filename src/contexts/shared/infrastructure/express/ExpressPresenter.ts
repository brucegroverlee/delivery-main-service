import AggregateRoot from '../../domain/entities/AggregateRoot';
import Presenter from '../../domain/Presenter';
/* eslint-disable import/order */
import DTOMapper from '../DTOMapper';
import { Response } from 'express';

class ExpressPresenter implements Presenter {
  public static RETURN_NEW_ENTITY_HTTP_STATUS_CODE = 201;
  public static RETURN_ENTITY_HTTP_STATUS_CODE = 200;
  public static RETURN_LIST_HTTP_STATUS_CODE = 200;
  public static RETURN_NOT_COMPLETED_ASYNC_PROCESS_HTTP_STATUS_CODE = 202;
  public static RETURN_EMPTY_HTTP_STATUS_CODE = 204;

  private dtoMapper: DTOMapper | null;
  private response: Response | null;

  constructor(dtoMapper: DTOMapper | null = null) {
    this.dtoMapper = dtoMapper;
    this.response = null;
  }

  public setResponse(response: Response): void {
    this.response = response;
  }

  returnNewEntity(object: AggregateRoot): void {
    this.response!.status(ExpressPresenter.RETURN_NEW_ENTITY_HTTP_STATUS_CODE).json(
      this.dtoMapper!.fromDomain(object).toDTO(),
    );
  }

  returnEntity(object: AggregateRoot): void {
    this.response!.status(ExpressPresenter.RETURN_ENTITY_HTTP_STATUS_CODE).json(
      this.dtoMapper!.fromDomain(object).toDTO(),
    );
  }

  returnList(objects: any[]): void {
    this.response!.status(ExpressPresenter.RETURN_LIST_HTTP_STATUS_CODE).json(
      this.dtoMapper!.fromDomain(objects).toDTO(),
    );
  }

  returnEmpty(): void {
    this.response!.status(ExpressPresenter.RETURN_EMPTY_HTTP_STATUS_CODE).send();
  }
}

export default ExpressPresenter;
