import { NextFunction, Request, Response } from 'express';
import NotAcceptableError from '../../../../../../infrastructure/express/errors/NotAcceptableError';
import InvalidArgumentError from '../../../../../shared/domain/valueObject/InvalidArgumentError';
import ExpressPresenter from '../../../../../shared/infrastructure/express/ExpressPresenter';
import { sequelizeDeliveryRepository } from '../../../sequelize/SequelizeDeliveryRepository';
import { rabbitMQEventBus } from '../../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import RecipientRejectRequest, { RecipientRejectRequestData } from '../../../../application/RecipientRejectRequest';
import deliveryMapper from '../../../DeliveryMapper';
import DeliveryId from '../../../../domain/DeliveryId';

interface RecipientRejectRequestControllerParams {
  deliveryId: string;
}

function recipientRejectRequestController() {
  const presenter = new ExpressPresenter(deliveryMapper);
  const recipientRejectRequest = new RecipientRejectRequest(sequelizeDeliveryRepository, rabbitMQEventBus, presenter);

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      presenter.setResponse(response);

      const params = request.params as unknown as RecipientRejectRequestControllerParams;

      const data: RecipientRejectRequestData = {
        deliveryId: DeliveryId.create(params.deliveryId),
      };

      await recipientRejectRequest.run(data);
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        next(new NotAcceptableError([error.message]));
      }

      next(error);
    }
  };
}

export default recipientRejectRequestController;
