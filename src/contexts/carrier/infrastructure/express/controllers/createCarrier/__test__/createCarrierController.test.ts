import request from 'supertest';
import { httpServer } from '../../../../../../../apps/server';
import ExpressPresenter from '../../../../../../shared/infrastructure/express/ExpressPresenter';
import CarrierStatus from '../../../../../domain/CarrierStatus';
import CarrierDTO from '../../../../CarrierDTO';
import { CarrierModel } from '../../../../sequelize/SequelizeCarrierRepository';

describe('POST /carriers', () => {
  it('creates a new carrier', async () => {
    /* Given */

    /* When */
    const response = await request(httpServer.app).post('/carriers').send({});

    /* Then */
    expect(response.status).toEqual(ExpressPresenter.RETURN_NEW_ENTITY_HTTP_STATUS_CODE);

    const expectedData = {
      status: CarrierStatus.IDLE,
      location: null,
      deliveryId: null,
    };

    const carrierResponse = response.body as CarrierDTO;
    expect(carrierResponse).toMatchObject(expectedData);

    const carrierDB = await CarrierModel.findByPk(carrierResponse.id);
    expect(carrierDB?.toJSON()).toMatchObject(expectedData);
  });
});
