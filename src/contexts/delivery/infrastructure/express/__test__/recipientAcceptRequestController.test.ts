import request from 'supertest';
import { httpServer } from '../../../../../apps/server';
import rabbitmqHttpApi from '../../../../../infrastructure/rabbitmq/rabbitmqHttpApi';
import ExpressPresenter from '../../../../shared/infrastructure/express/ExpressPresenter';
import DeliveryStatus from '../../../domain/DeliveryStatus';
import DeliveryFareCalculated from '../../../domain/events/DeliveryFareCalculated';
import DeliveryDomainEventDTO from '../../DeliveryDomainEventDTO';
import DeliveryDTO from '../../DeliveryDTO';
import { DeliveryModel } from '../../sequelize/SequelizeDeliveryRepository';
import RecipientAcceptRequestControllerMother from './RecipientAcceptRequestControllerMother';

describe('PATCH /deliveries/:deliveryId/recipient-accept-request', () => {
  it('accepts the delivery request', async () => {
    /* Given */
    const { delivery, recipient } = await RecipientAcceptRequestControllerMother.givenAJustCreatedDelivery();

    /* When */
    const response = await request(httpServer.app).patch(`/deliveries/${delivery.id}/recipient-accept-request`).send({
      recipientLocation: recipient.userLocation,
    });

    /* Then */
    expect(response.status).toEqual(ExpressPresenter.RETURN_ENTITY_HTTP_STATUS_CODE);

    const expectedData = {
      recipientId: recipient.userId,
      recipientLocation: recipient.userLocation,
      status: DeliveryStatus.ACCEPTED_BY_RECIPIENT,
      carrierId: null,
      startedTime: null,
      completedTime: null,
    };

    const deliveryResponse = response.body as DeliveryDTO;
    expect(deliveryResponse).toMatchObject(expectedData);
    expect(typeof deliveryResponse.fare).toBe('number');

    const deliveryDB = await DeliveryModel.findByPk(delivery.id);
    expect(deliveryDB?.toJSON()).toMatchObject(expectedData);
    expect(typeof deliveryDB?.toJSON().fare).toBe('number');

    const domainEvent = await rabbitmqHttpApi.findDomainEvent({
      aggregateId: delivery.id,
      eventName: DeliveryFareCalculated.EVENT_NAME,
    });
    expect(domainEvent).not.toBeNull();
    expect((domainEvent as DeliveryDomainEventDTO)?.delivery).toMatchObject(expectedData);
    expect(typeof (domainEvent as DeliveryDomainEventDTO)?.delivery.fare).toBe('number');
  });
});
