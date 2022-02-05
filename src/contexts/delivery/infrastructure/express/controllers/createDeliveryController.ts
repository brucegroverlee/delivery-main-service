import { NextFunction, Request, Response } from 'express';
import NotAcceptableError from '../../../../../infrastructure/express/errors/NotAcceptableError';
import InvalidArgumentError from '../../../../shared/domain/valueObject/InvalidArgumentError';
import ExpressPresenter from '../../../../shared/infrastructure/express/ExpressPresenter';
import { sequelizeDeliveryRepository } from '../../sequelize/SequelizeDeliveryRepository';
import { rabbitMQEventBus } from '../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import CreateDelivery, { CreateDeliveryData } from '../../../application/CreateDelivery';

function createDeliveryController() {
  const presenter = new ExpressPresenter();
  const createDelivery = new CreateDelivery(sequelizeDeliveryRepository, rabbitMQEventBus, presenter);

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      presenter.setResponse(response);

      const data: CreateDeliveryData = request.body;

      await createDelivery.run(data);
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        next(new NotAcceptableError([error.message]));
      }

      next(error);
    }
  };
}

export default createDeliveryController;
