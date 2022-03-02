import request from 'supertest';
import { httpServer } from '../../../../../../../apps/server';
import rabbitmqHttpApi from '../../../../../../../infrastructure/rabbitmq/rabbitmqHttpApi';
import ExpressPresenter from '../../../../../../shared/infrastructure/express/ExpressPresenter';
import DeliveryStatus from '../../../../../domain/DeliveryStatus';
import DeliveryFareRejected from '../../../../../domain/events/DeliveryFareRejected';
import DeliveryDomainEventDTO from '../../../../DeliveryDomainEventDTO';
import DeliveryDTO from '../../../../DeliveryDTO';
import { DeliveryModel } from '../../../../sequelize/SequelizeDeliveryRepository';
import SenderRejectDeliveryFareControllerMother from './SenderRejectDeliveryFareControllerMother';

describe('PATCH /deliveries/:deliveryId/sender-reject-fare', () => {
  it('rejects the delivery fare', async () => {
    /* Given */
    const { delivery } = await SenderRejectDeliveryFareControllerMother.givenADeliveryWithFareCalculated();

    /* When */
    const response = await request(httpServer.app).patch(`/deliveries/${delivery.id}/sender-reject-fare`);

    /* Then */
    const expectedData = {
      status: DeliveryStatus.DELIVERY_FARE_REJECTED_BY_SENDER,
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
      eventName: DeliveryFareRejected.EVENT_NAME,
    });
    expect(domainEvent).not.toBeNull();
    expect((domainEvent as DeliveryDomainEventDTO)?.data).toMatchObject(expectedData);
  });
});
