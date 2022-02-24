import request from 'supertest';
import { httpServer } from '../../../../../../../apps/server';
import rabbitmqHttpApi from '../../../../../../../infrastructure/rabbitmq/rabbitmqHttpApi';
import ExpressPresenter from '../../../../../../shared/infrastructure/express/ExpressPresenter';
import DeliveryStatus from '../../../../../domain/DeliveryStatus';
import PackageAccepted from '../../../../../domain/events/PackageAccepted';
import DeliveryDomainEventDTO from '../../../../DeliveryDomainEventDTO';
import DeliveryDTO from '../../../../DeliveryDTO';
import { DeliveryModel } from '../../../../sequelize/SequelizeDeliveryRepository';
import RecipientAcceptPackageMother from './RecipientAcceptPackageMother';

describe('PATCH /deliveries/:deliveryId/recipient-accept-package', () => {
  it('sets recipient accepted package', async () => {
    /* Given */
    const { delivery } = await RecipientAcceptPackageMother.givenADelivery();

    /* When */
    const response = await request(httpServer.app).patch(`/deliveries/${delivery.id}/recipient-accept-package`);

    /* Then */
    const expectedData = {
      status: DeliveryStatus.PACKAGE_ACCEPTED,
    };

    expect(response.status).toEqual(ExpressPresenter.RETURN_ENTITY_HTTP_STATUS_CODE);
    const deliveryResponse = response.body as DeliveryDTO;
    expect(deliveryResponse).toMatchObject(expectedData);
    expect(deliveryResponse.completedTime).not.toBeNull();

    const deliveryDB = await DeliveryModel.findByPk(delivery.id);
    expect(deliveryDB?.toJSON()).toMatchObject(expectedData);
    expect(deliveryResponse.completedTime).not.toBeNull();

    const domainEvent = await rabbitmqHttpApi.findDomainEvent({
      aggregateId: delivery.id,
      eventName: PackageAccepted.EVENT_NAME,
    });
    expect(domainEvent).not.toBeNull();
    expect((domainEvent as DeliveryDomainEventDTO)?.delivery).toMatchObject(expectedData);
    expect((domainEvent as DeliveryDomainEventDTO)?.delivery.completedTime).not.toBeNull();
  });
});
