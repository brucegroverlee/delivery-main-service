import { NextFunction, Request, Response } from 'express';
import NotAcceptableError from '../../../../../../infrastructure/express/errors/NotAcceptableError';
import InvalidArgumentError from '../../../../../shared/domain/valueObject/InvalidArgumentError';
import ExpressPresenter from '../../../../../shared/infrastructure/express/ExpressPresenter';
import { sequelizeCarrierRepository } from '../../../sequelize/SequelizeCarrierRepository';
import RabbitMQEventBus from '../../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import CreateCarrier from '../../../../application/createCarrier/CreateCarrier';
import deliveryMapper from '../../../CarrierMapper';
import carrierDomainEventMapper from '../../../CarrierDomainEventMapper';

function createCarrierController() {
  const eventBus = new RabbitMQEventBus(carrierDomainEventMapper);
  const presenter = new ExpressPresenter(deliveryMapper);
  const createCarrier = new CreateCarrier(sequelizeCarrierRepository, eventBus, presenter);

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      presenter.setResponse(response);

      await createCarrier.run();
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        next(new NotAcceptableError([error.message]));
      }

      next(error);
    }
  };
}

export default createCarrierController;
