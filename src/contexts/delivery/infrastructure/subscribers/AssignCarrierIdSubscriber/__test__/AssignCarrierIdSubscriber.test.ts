import { rabbitmqApp } from '../../../../../../infrastructure/rabbitmq/RabbitmqApp';
import { rabbitMQEventBus } from '../../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import DeliveryStatus from '../../../../domain/DeliveryStatus';
import { DeliveryModel } from '../../../sequelize/SequelizeDeliveryRepository';
import { assignCarrierIdSubscriber } from '../AssignCarrierIdSubscriber';
import AssignCarrierIdSubscriberMother from './AssignCarrierIdSubscriberMother';

jest.setTimeout(10000);

describe('SUBSCRIBER => AssignCarrierIdSubscriber', () => {
  beforeAll(async () => {
    rabbitMQEventBus.addSubscribers([assignCarrierIdSubscriber]);

    await rabbitmqApp.connect();
  });

  afterAll(async () => {
    // await rabbitmqApp.close();
  });

  it('assigns the carrierId to the delivery and updates the status to CARRIER_ASSIGNED', async () => {
    /* Given */
    const { delivery } = await AssignCarrierIdSubscriberMother.givenADeliveryWithFareAccepted();

    /* When */
    rabbitmqApp.publish('domain_event.carrier.assigned', {
      carrier: {
        id: 'ba9d8cff-814e-41ba-ab13-0cf4eee8eb4c',
        deliveryId: delivery.id,
      },
      eventName: 'domain_event.carrier.assigned',
      aggregateId: 'ba9d8cff-814e-41ba-ab13-0cf4eee8eb4c',
      eventId: 'a65a85d7-d3db-4311-a00f-0de271792e0d',
      occurredOn: '2022-02-18T03:05:41.772Z',
    });

    /* Then */
    await new Promise((r) => setTimeout(r, 2000));

    const expectedData = {
      status: DeliveryStatus.CARRIER_ASSIGNED,
      carrierId: 'ba9d8cff-814e-41ba-ab13-0cf4eee8eb4c',
      startedTime: null,
      completedTime: null,
    };

    const deliveryDB = await DeliveryModel.findByPk(delivery.id);
    expect(deliveryDB?.toJSON()).toMatchObject(expectedData);
  });
});
