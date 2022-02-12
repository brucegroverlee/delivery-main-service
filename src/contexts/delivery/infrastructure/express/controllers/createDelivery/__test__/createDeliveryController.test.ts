import request from 'supertest';
import { httpServer } from '../../../../../../../apps/server';
import rabbitmqHttpApi from '../../../../../../../infrastructure/rabbitmq/rabbitmqHttpApi';
import ExpressPresenter from '../../../../../../shared/infrastructure/express/ExpressPresenter';
import DeliveryStatus from '../../../../../domain/DeliveryStatus';
import DeliveryCreated from '../../../../../domain/events/DeliveryCreated';
import DeliveryDomainEventDTO from '../../../../DeliveryDomainEventDTO';
import DeliveryDTO from '../../../../DeliveryDTO';
import { DeliveryModel } from '../../../../sequelize/SequelizeDeliveryRepository';
import CreateDeliveryControllerMother from './CreateDeliveryControllerMother';

describe('POST /deliveries', () => {
  it('creates a new delivery', async () => {
    /* Given */
    const { sender, recipient } = CreateDeliveryControllerMother.givenTwoUsers();

    /* When */
    const response = await request(httpServer.app).post('/deliveries').send({
      senderId: sender.userId,
      senderLocation: recipient.userLocation,
      recipientId: recipient.userId,
      recipientLocation: recipient.userLocation,
    });

    /* Then */
    expect(response.status).toEqual(ExpressPresenter.RETURN_NEW_ENTITY_HTTP_STATUS_CODE);

    const expectedData = {
      senderId: sender.userId,
      recipientId: recipient.userId,
      status: DeliveryStatus.CREATED,
      fare: null,
      carrierId: null,
      startedTime: null,
      completedTime: null,
    };

    const deliveryResponse = response.body as DeliveryDTO;
    expect(deliveryResponse).toMatchObject(expectedData);

    const deliveryDB = await DeliveryModel.findByPk(deliveryResponse.id);
    expect(deliveryDB?.toJSON()).toMatchObject(expectedData);

    const domainEvent = await rabbitmqHttpApi.findDomainEvent({
      aggregateId: deliveryResponse.id,
      eventName: DeliveryCreated.EVENT_NAME,
    });
    expect(domainEvent as DeliveryDomainEventDTO).not.toBeNull();
    expect((domainEvent as DeliveryDomainEventDTO)?.delivery).toMatchObject(expectedData);
  });
});
