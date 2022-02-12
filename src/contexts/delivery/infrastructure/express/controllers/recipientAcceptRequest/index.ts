import { NextFunction, Request, Response } from 'express';
import NotAcceptableError from '../../../../../../infrastructure/express/errors/NotAcceptableError';
import InvalidArgumentError from '../../../../../shared/domain/valueObject/InvalidArgumentError';
import ExpressPresenter from '../../../../../shared/infrastructure/express/ExpressPresenter';
import { googleMapsDeliveryFareCalculator } from '../../../googleMaps/GoogleMapsDeliveryFareCalculator';
import { sequelizeDeliveryRepository } from '../../../sequelize/SequelizeDeliveryRepository';
import { rabbitMQEventBus } from '../../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import RecipientAcceptRequest, { RecipientAcceptRequestData } from '../../../../application/RecipientAcceptRequest';
import deliveryMapper from '../../../DeliveryMapper';
import LocationDTO from '../../../LocationDTO';
import DeliveryId from '../../../../domain/DeliveryId';
import Location from '../../../../domain/Location';

interface RecipientAcceptRequestControllerParams {
  deliveryId: string;
}
interface RecipientAcceptRequestControllerBody {
  recipientLocation: LocationDTO;
}

function recipientAcceptRequestController() {
  const presenter = new ExpressPresenter(deliveryMapper);
  const recipientAcceptRequest = new RecipientAcceptRequest(
    googleMapsDeliveryFareCalculator,
    sequelizeDeliveryRepository,
    rabbitMQEventBus,
    presenter,
  );

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      presenter.setResponse(response);

      const params = request.params as unknown as RecipientAcceptRequestControllerParams;

      const body = request.body as RecipientAcceptRequestControllerBody;

      const data: RecipientAcceptRequestData = {
        deliveryId: DeliveryId.create(params.deliveryId),
        recipientLocation: Location.create(body.recipientLocation),
      };

      await recipientAcceptRequest.run(data);
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        next(new NotAcceptableError([error.message]));
      }

      next(error);
    }
  };
}

export default recipientAcceptRequestController;
