import { NextFunction, Request, Response } from 'express';
import NotAcceptableError from '../../../../../../infrastructure/express/errors/NotAcceptableError';
import InvalidArgumentError from '../../../../../shared/domain/valueObject/InvalidArgumentError';
import ExpressPresenter from '../../../../../shared/infrastructure/express/ExpressPresenter';
import { sequelizeDeliveryRepository } from '../../../sequelize/SequelizeDeliveryRepository';
import RabbitMQEventBus from '../../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import CreateDelivery, { CreateDeliveryData } from '../../../../application/CreateDelivery';
import deliveryMapper from '../../../DeliveryMapper';
import UserId from '../../../../domain/UserId';
import Location from '../../../../domain/Location';
import LocationDTO from '../../../LocationDTO';
import deliveryDomainEventMapper from '../../../DeliveryDomainEventMapper';

interface CreateDeliveryControllerBody {
  senderId: string;
  senderLocation: LocationDTO;
  recipientId: string;
  recipientLocation: LocationDTO;
}

function createDeliveryController() {
  const eventBus = new RabbitMQEventBus(deliveryDomainEventMapper);
  const presenter = new ExpressPresenter(deliveryMapper);
  const createDelivery = new CreateDelivery(sequelizeDeliveryRepository, eventBus, presenter);

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      presenter.setResponse(response);

      // const data: CreateDeliveryData = request.body;
      const body: CreateDeliveryControllerBody = request.body;

      const data: CreateDeliveryData = {
        senderId: UserId.create(body.senderId),
        senderLocation: Location.create(body.senderLocation),
        recipientId: UserId.create(body.recipientId),
        recipientLocation: Location.create(body.recipientLocation),
      };

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
