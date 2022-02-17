import request from 'supertest';
import { httpServer } from '../../../../../../../apps/server';
import rabbitmqHttpApi from '../../../../../../../infrastructure/rabbitmq/rabbitmqHttpApi';
import ExpressPresenter from '../../../../../../shared/infrastructure/express/ExpressPresenter';
import DeliveryStatus from '../../../../../domain/DeliveryStatus';
import DeliveryFareAccepted from '../../../../../domain/events/DeliveryFareAccepted';
import DeliveryDomainEventDTO from '../../../../DeliveryDomainEventDTO';
import DeliveryDTO from '../../../../DeliveryDTO';
import { DeliveryModel } from '../../../../sequelize/SequelizeDeliveryRepository';
import SenderAcceptDeliveryFareControllerMother from './SenderAcceptDeliveryFareControllerMother';

describe('PATCH /deliveries/:deliveryId/sender-accept-fare', () => {
  it('accepts the delivery fare', async () => {
    /* Given */
    const { delivery } = await SenderAcceptDeliveryFareControllerMother.givenADeliveryWithFareCalculated();

    /* When */
    const response = await request(httpServer.app).patch(`/deliveries/${delivery.id}/sender-accept-fare`);

    /* Then */
    const expectedData = {
      status: DeliveryStatus.DELIVERY_FARE_ACCEPTED_BY_SENDER,
      fare: delivery.fare,
      carrierId: null,
      startedTime: null,
      completedTime: null,
    };

    expect(response.status).toEqual(ExpressPresenter.RETURN_ENTITY_HTTP_STATUS_CODE);
    const deliveryResponse = response.body as DeliveryDTO;
    expect(deliveryResponse).toMatchObject(expectedData);

    const deliveryDB = await DeliveryModel.findByPk(delivery.id);
    expect(deliveryDB?.toJSON()).toMatchObject(expectedData);

    const domainEvent = await rabbitmqHttpApi.findDomainEvent({
      aggregateId: delivery.id,
      eventName: DeliveryFareAccepted.EVENT_NAME,
    });
    expect(domainEvent).not.toBeNull();
    expect((domainEvent as DeliveryDomainEventDTO)?.delivery).toMatchObject(expectedData);
  });
});
