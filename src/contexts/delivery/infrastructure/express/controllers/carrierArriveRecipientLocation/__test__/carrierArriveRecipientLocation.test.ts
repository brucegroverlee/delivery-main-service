import request from 'supertest';
import { httpServer } from '../../../../../../../apps/server';
import rabbitmqHttpApi from '../../../../../../../infrastructure/rabbitmq/rabbitmqHttpApi';
import ExpressPresenter from '../../../../../../shared/infrastructure/express/ExpressPresenter';
import DeliveryStatus from '../../../../../domain/DeliveryStatus';
import RecipientLocationCarrierArrived from '../../../../../domain/events/RecipientLocationCarrierArrived';
import DeliveryDomainEventDTO from '../../../../DeliveryDomainEventDTO';
import DeliveryDTO from '../../../../DeliveryDTO';
import { DeliveryModel } from '../../../../sequelize/SequelizeDeliveryRepository';
import CarrierArriveRecipientLocationMother from './CarrierArriveRecipientLocationMother';

describe('PATCH /deliveries/:deliveryId/carrier-arrive-recipient-location', () => {
  it('sets carrier arrived at recipient location', async () => {
    /* Given */
    const { delivery } = await CarrierArriveRecipientLocationMother.givenADelivery();

    /* When */
    const response = await request(httpServer.app).patch(
      `/deliveries/${delivery.id}/carrier-arrive-recipient-location`,
    );

    /* Then */
    const expectedData = {
      status: DeliveryStatus.ARRIVE_RECIPIENT_LOCATION,
      completedTime: null,
    };

    expect(response.status).toEqual(ExpressPresenter.RETURN_ENTITY_HTTP_STATUS_CODE);
    const deliveryResponse = response.body as DeliveryDTO;
    expect(deliveryResponse).toMatchObject(expectedData);

    const deliveryDB = await DeliveryModel.findByPk(delivery.id);
    expect(deliveryDB?.toJSON()).toMatchObject(expectedData);

    const domainEvent = await rabbitmqHttpApi.findDomainEvent({
      aggregateId: delivery.id,
      eventName: RecipientLocationCarrierArrived.EVENT_NAME,
    });
    expect(domainEvent).not.toBeNull();
    expect((domainEvent as DeliveryDomainEventDTO)?.data).toMatchObject(expectedData);
  });
});
