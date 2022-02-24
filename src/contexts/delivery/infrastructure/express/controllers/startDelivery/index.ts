import { NextFunction, Request, Response } from 'express';
import NotAcceptableError from '../../../../../../infrastructure/express/errors/NotAcceptableError';
import InvalidArgumentError from '../../../../../shared/domain/valueObject/InvalidArgumentError';
import ExpressPresenter from '../../../../../shared/infrastructure/express/ExpressPresenter';
import { sequelizeDeliveryRepository } from '../../../sequelize/SequelizeDeliveryRepository';
import { rabbitMQEventBus } from '../../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import StartDelivery, { StartDeliveryData } from '../../../../application/StartDelivery';
import deliveryMapper from '../../../DeliveryMapper';
import DeliveryId from '../../../../domain/DeliveryId';

interface StartDeliveryControllerParams {
  deliveryId: string;
}

function startDeliveryController() {
  const presenter = new ExpressPresenter(deliveryMapper);
  const startDelivery = new StartDelivery(sequelizeDeliveryRepository, rabbitMQEventBus, presenter);

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      presenter.setResponse(response);

      const params = request.params as unknown as StartDeliveryControllerParams;

      const data: StartDeliveryData = {
        deliveryId: DeliveryId.create(params.deliveryId),
      };

      await startDelivery.run(data);
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        next(new NotAcceptableError([error.message]));
      }

      next(error);
    }
  };
}

export default startDeliveryController;
