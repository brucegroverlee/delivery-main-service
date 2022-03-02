import request from 'supertest';
import { httpServer } from '../../../../../../../apps/server';
import rabbitmqHttpApi from '../../../../../../../infrastructure/rabbitmq/rabbitmqHttpApi';
import ExpressPresenter from '../../../../../../shared/infrastructure/express/ExpressPresenter';
import DeliveryStatus from '../../../../../domain/DeliveryStatus';
import SenderLocationCarrierArrived from '../../../../../domain/events/SenderLocationCarrierArrived';
import DeliveryDomainEventDTO from '../../../../DeliveryDomainEventDTO';
import DeliveryDTO from '../../../../DeliveryDTO';
import { DeliveryModel } from '../../../../sequelize/SequelizeDeliveryRepository';
import CarrierArriveSenderLocationControllerMother from './CarrierArriveSenderLocationControllerMother';

describe('PATCH /deliveries/:deliveryId/carrier-arrive-sender-location', () => {
  it('sets carrier arrived at sender location', async () => {
    /* Given */
    const { delivery } = await CarrierArriveSenderLocationControllerMother.givenADeliveryWaitingForCarrier();

    /* When */
    const response = await request(httpServer.app).patch(`/deliveries/${delivery.id}/carrier-arrive-sender-location`);

    /* Then */
    const expectedData = {
      status: DeliveryStatus.CARRIER_ARRIVED_SENDER_LOCATION,
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
      eventName: SenderLocationCarrierArrived.EVENT_NAME,
    });
    expect(domainEvent).not.toBeNull();
    expect((domainEvent as DeliveryDomainEventDTO)?.data).toMatchObject(expectedData);
  });
});
