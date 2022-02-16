import request from 'supertest';
import { httpServer } from '../../../../../../../apps/server';
import rabbitmqHttpApi from '../../../../../../../infrastructure/rabbitmq/rabbitmqHttpApi';
import ExpressPresenter from '../../../../../../shared/infrastructure/express/ExpressPresenter';
import DeliveryStatus from '../../../../../domain/DeliveryStatus';
import RecipientRequestRejected from '../../../../../domain/events/RecipientRequestRejected';
import DeliveryDomainEventDTO from '../../../../DeliveryDomainEventDTO';
import DeliveryDTO from '../../../../DeliveryDTO';
import { DeliveryModel } from '../../../../sequelize/SequelizeDeliveryRepository';
import RecipientRejectRequestControllerMother from './RecipientRejectRequestControllerMother';

describe('GET /deliveries/:deliveryId/recipient-reject-request', () => {
  it('accepts the delivery request', async () => {
    /* Given */
    const { delivery } = await RecipientRejectRequestControllerMother.givenAJustCreatedDelivery();

    /* When */
    const response = await request(httpServer.app).get(`/deliveries/${delivery.id}/recipient-reject-request`);

    /* Then */
    const expectedData = {
      status: DeliveryStatus.REJECTED_BY_RECIPIENT,
      fare: null,
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
      eventName: RecipientRequestRejected.EVENT_NAME,
    });
    expect(domainEvent).not.toBeNull();
    expect((domainEvent as DeliveryDomainEventDTO)?.delivery).toMatchObject(expectedData);
  });
});
