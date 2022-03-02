import { NextFunction, Request, Response } from 'express';
import NotAcceptableError from '../../../../../../infrastructure/express/errors/NotAcceptableError';
import InvalidArgumentError from '../../../../../shared/domain/valueObject/InvalidArgumentError';
import ExpressPresenter from '../../../../../shared/infrastructure/express/ExpressPresenter';
import { sequelizeDeliveryRepository } from '../../../sequelize/SequelizeDeliveryRepository';
import RabbitMQEventBus from '../../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import SenderAcceptFare, { SenderAcceptFareData } from '../../../../application/SenderAcceptFare';
import deliveryMapper from '../../../DeliveryMapper';
import DeliveryId from '../../../../domain/DeliveryId';
import deliveryDomainEventMapper from '../../../DeliveryDomainEventMapper';

interface SenderAcceptFareControllerParams {
  deliveryId: string;
}

function senderAcceptFareController() {
  const eventBus = new RabbitMQEventBus(deliveryDomainEventMapper);
  const presenter = new ExpressPresenter(deliveryMapper);
  const senderAcceptFare = new SenderAcceptFare(sequelizeDeliveryRepository, eventBus, presenter);

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      presenter.setResponse(response);

      const params = request.params as unknown as SenderAcceptFareControllerParams;

      const data: SenderAcceptFareData = {
        deliveryId: DeliveryId.create(params.deliveryId),
      };

      await senderAcceptFare.run(data);
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        next(new NotAcceptableError([error.message]));
      }

      next(error);
    }
  };
}

export default senderAcceptFareController;
