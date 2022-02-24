import request from 'supertest';
import { httpServer } from '../../../../../../../apps/server';
import rabbitmqHttpApi from '../../../../../../../infrastructure/rabbitmq/rabbitmqHttpApi';
import ExpressPresenter from '../../../../../../shared/infrastructure/express/ExpressPresenter';
import DeliveryStatus from '../../../../../domain/DeliveryStatus';
import DeliveryStarted from '../../../../../domain/events/DeliveryStarted';
import DeliveryDomainEventDTO from '../../../../DeliveryDomainEventDTO';
import DeliveryDTO from '../../../../DeliveryDTO';
import { DeliveryModel } from '../../../../sequelize/SequelizeDeliveryRepository';
import StartDeliveryControllerMother from './StartDeliveryControllerMother';

describe('PATCH /deliveries/:deliveryId/start', () => {
  it('starts the delivery', async () => {
    /* Given */
    const { delivery } = await StartDeliveryControllerMother.givenADeliveryWaitingForStart();

    /* When */
    const response = await request(httpServer.app).patch(`/deliveries/${delivery.id}/start`);

    /* Then */
    const expectedData = {
      status: DeliveryStatus.STARTED,
      completedTime: null,
    };

    expect(response.status).toEqual(ExpressPresenter.RETURN_ENTITY_HTTP_STATUS_CODE);
    const deliveryResponse = response.body as DeliveryDTO;
    expect(deliveryResponse).toMatchObject(expectedData);
    expect(deliveryResponse.startedTime).not.toBeNull();

    const deliveryDB = await DeliveryModel.findByPk(delivery.id);
    expect(deliveryDB?.toJSON()).toMatchObject(expectedData);
    expect(deliveryResponse.startedTime).not.toBeNull();

    const domainEvent = await rabbitmqHttpApi.findDomainEvent({
      aggregateId: delivery.id,
      eventName: DeliveryStarted.EVENT_NAME,
    });
    expect(domainEvent).not.toBeNull();
    expect((domainEvent as DeliveryDomainEventDTO)?.delivery).toMatchObject(expectedData);
    expect((domainEvent as DeliveryDomainEventDTO)?.delivery.startedTime).not.toBeNull();
  });
});
