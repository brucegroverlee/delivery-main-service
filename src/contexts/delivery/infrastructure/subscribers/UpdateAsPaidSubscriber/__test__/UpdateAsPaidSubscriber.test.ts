import { rabbitmqApp } from '../../../../../../infrastructure/rabbitmq/RabbitmqApp';
import RabbitMQEventBus from '../../../../../shared/infrastructure/rabbitmq/RabbitMQEventBus';
import DeliveryStatus from '../../../../domain/DeliveryStatus';
import { DeliveryModel } from '../../../sequelize/SequelizeDeliveryRepository';
import { updateAsPaidSubscriber } from '../UpdateAsPaidSubscriber';
import PayDeliverySubscriberMother from './UpdateAsPaidSubscriberMother';

jest.setTimeout(10000);

describe('SUBSCRIBER => UpdateAsPaidSubscriber', () => {
  beforeAll(async () => {
    RabbitMQEventBus.addSubscribers([updateAsPaidSubscriber]);

    await rabbitmqApp.connect();
  });

  afterAll(async () => {
    // await rabbitmqApp.close();
  });

  it('updates the status to DELIVERY_PAID', async () => {
    /* Given */
    const { delivery } = await PayDeliverySubscriberMother.givenADelivery();

    /* When */
    rabbitmqApp.publish('test.domain_event.invoice.created', {
      data: {
        id: 'ba9d8cff-814e-41ba-ab13-0cf4eee8eb4c',
        deliveryId: delivery.id,
        userId: 'a65a85d7-d3db-4311-a00f-0de271792e0d',
      },
      eventName: 'test.domain_event.invoice.created',
      aggregateId: 'ba9d8cff-814e-41ba-ab13-0cf4eee8eb4c',
      eventId: 'a65a85d7-d3db-4311-a00f-0de271792e0d',
      occurredOn: '2022-02-18T03:05:41.772Z',
    });

    /* Then */
    await new Promise((r) => setTimeout(r, 2000));

    const expectedData = {
      status: DeliveryStatus.DELIVERY_PAID,
    };

    const deliveryDB = await DeliveryModel.findByPk(delivery.id);
    expect(deliveryDB?.toJSON()).toMatchObject(expectedData);
  });
});
