import { NextFunction, Request, Response } from 'express';
import NotAcceptableError from '../../../../../../infrastructure/express/errors/NotAcceptableError';
import InvalidArgumentError from '../../../../../shared/domain/valueObject/InvalidArgumentError';
import ExpressPresenter from '../../../../../shared/infrastructure/express/ExpressPresenter';
import { sequelizeDeliveryRepository } from '../../../sequelize/SequelizeDeliveryRepository';
import RabbitMQEventBus from '../../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import CarrierArriveSenderLocation, {
  CarrierArriveSenderLocationData,
} from '../../../../application/CarrierArriveSenderLocation';
import deliveryMapper from '../../../DeliveryMapper';
import DeliveryId from '../../../../domain/DeliveryId';
import deliveryDomainEventMapper from '../../../DeliveryDomainEventMapper';

interface CarrierArriveSenderLocationControllerParams {
  deliveryId: string;
}

function carrierArriveSenderLocationController() {
  const eventBus = new RabbitMQEventBus(deliveryDomainEventMapper);
  const presenter = new ExpressPresenter(deliveryMapper);
  const carrierArriveSenderLocation = new CarrierArriveSenderLocation(sequelizeDeliveryRepository, eventBus, presenter);

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      presenter.setResponse(response);

      const params = request.params as unknown as CarrierArriveSenderLocationControllerParams;

      const data: CarrierArriveSenderLocationData = {
        deliveryId: DeliveryId.create(params.deliveryId),
      };

      await carrierArriveSenderLocation.run(data);
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        next(new NotAcceptableError([error.message]));
      }

      next(error);
    }
  };
}

export default carrierArriveSenderLocationController;
