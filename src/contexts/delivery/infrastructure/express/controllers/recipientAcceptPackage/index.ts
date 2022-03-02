import { NextFunction, Request, Response } from 'express';
import NotAcceptableError from '../../../../../../infrastructure/express/errors/NotAcceptableError';
import InvalidArgumentError from '../../../../../shared/domain/valueObject/InvalidArgumentError';
import ExpressPresenter from '../../../../../shared/infrastructure/express/ExpressPresenter';
import { sequelizeDeliveryRepository } from '../../../sequelize/SequelizeDeliveryRepository';
import RabbitMQEventBus from '../../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import RecipientAcceptPackage, { RecipientAcceptPackageData } from '../../../../application/RecipientAcceptPackage';
import deliveryMapper from '../../../DeliveryMapper';
import DeliveryId from '../../../../domain/DeliveryId';
import deliveryDomainEventMapper from '../../../DeliveryDomainEventMapper';

interface RecipientAcceptPackageControllerParams {
  deliveryId: string;
}

function recipientAcceptPackageController() {
  const eventBus = new RabbitMQEventBus(deliveryDomainEventMapper);
  const presenter = new ExpressPresenter(deliveryMapper);
  const recipientAcceptPackage = new RecipientAcceptPackage(sequelizeDeliveryRepository, eventBus, presenter);

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      presenter.setResponse(response);

      const params = request.params as unknown as RecipientAcceptPackageControllerParams;

      const data: RecipientAcceptPackageData = {
        deliveryId: DeliveryId.create(params.deliveryId),
      };

      await recipientAcceptPackage.run(data);
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        next(new NotAcceptableError([error.message]));
      }

      next(error);
    }
  };
}

export default recipientAcceptPackageController;
