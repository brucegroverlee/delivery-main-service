import { rabbitmqApp } from '../../../../../../infrastructure/rabbitmq/RabbitmqApp';
import rabbitmqHttpApi from '../../../../../../infrastructure/rabbitmq/rabbitmqHttpApi';
import { rabbitMQEventBus } from '../../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import CarrierStatus from '../../../../domain/CarrierStatus';
import CarrierAssignedDomainEvent from '../../../../domain/CarrierAssignedDomainEvent';
import { CarrierModel } from '../../../sequelize/SequelizeCarrierRepository';
import { findAvailableCarrierSubscriber } from '../FindAvailableCarrierSubscriber';
import CarrierDomainEventDTO from '../../../../infrastructure/CarrierDomainEventDTO';
import FindAvailableCarrierSubscriberMother from './FindAvailableCarrierSubscriberMother';

jest.setTimeout(10000);

describe('SUBSCRIBER => FindAvailableCarrierSubscriber', () => {
  beforeAll(async () => {
    rabbitMQEventBus.addSubscribers([findAvailableCarrierSubscriber]);

    await rabbitmqApp.connect();
  });

  afterAll(async () => {
    // await rabbitmqApp.close();
  });

  it('fins a available carrier, assigns the delivery to it, and updates the status to ASSIGNED', async () => {
    /* Given */
    const { deliveryId } = await FindAvailableCarrierSubscriberMother.givenAnAvailableCarrier();

    /* When */
    rabbitmqApp.publish('domain_event.delivery.fare_accepted', {
      delivery: {
        id: deliveryId,
        senderLocation: {
          address: '',
          latitude: 0,
          longitude: 0,
        },
      },
      eventName: 'domain_event.delivery.fare_accepted',
      aggregateId: deliveryId,
      eventId: 'a65a85d7-d3db-4311-a00f-0de271792e0d',
      occurredOn: '2022-02-18T03:05:41.772Z',
    });

    /* Then */
    await new Promise((r) => setTimeout(r, 2000));

    const expectedData = {
      status: CarrierStatus.ASSIGNED,
      deliveryId,
    };

    const carrierDB = await CarrierModel.findOne({ where: { deliveryId } });
    expect(carrierDB?.toJSON()).toMatchObject(expectedData);

    const domainEvent = await rabbitmqHttpApi.findDomainEvent({
      aggregateId: carrierDB?.toJSON().id!,
      eventName: CarrierAssignedDomainEvent.EVENT_NAME,
    });
    expect(domainEvent as CarrierDomainEventDTO).not.toBeNull();
    expect((domainEvent as CarrierDomainEventDTO)?.carrier).toMatchObject(expectedData);
  });
});
