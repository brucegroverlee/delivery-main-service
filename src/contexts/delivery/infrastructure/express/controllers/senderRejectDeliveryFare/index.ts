import { NextFunction, Request, Response } from 'express';
import NotAcceptableError from '../../../../../../infrastructure/express/errors/NotAcceptableError';
import InvalidArgumentError from '../../../../../shared/domain/valueObject/InvalidArgumentError';
import ExpressPresenter from '../../../../../shared/infrastructure/express/ExpressPresenter';
import { sequelizeDeliveryRepository } from '../../../sequelize/SequelizeDeliveryRepository';
import RabbitMQEventBus from '../../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import SenderRejectFare, { SenderRejectFareData } from '../../../../application/SenderRejectFare';
import deliveryMapper from '../../../DeliveryMapper';
import DeliveryId from '../../../../domain/DeliveryId';
import deliveryDomainEventMapper from '../../../DeliveryDomainEventMapper';

interface SenderRejectFareControllerParams {
  deliveryId: string;
}

function senderRejectFareController() {
  const eventBus = new RabbitMQEventBus(deliveryDomainEventMapper);
  const presenter = new ExpressPresenter(deliveryMapper);
  const senderRejectFare = new SenderRejectFare(sequelizeDeliveryRepository, eventBus, presenter);

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      presenter.setResponse(response);

      const params = request.params as unknown as SenderRejectFareControllerParams;

      const data: SenderRejectFareData = {
        deliveryId: DeliveryId.create(params.deliveryId),
      };

      await senderRejectFare.run(data);
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        next(new NotAcceptableError([error.message]));
      }

      next(error);
    }
  };
}

export default senderRejectFareController;
