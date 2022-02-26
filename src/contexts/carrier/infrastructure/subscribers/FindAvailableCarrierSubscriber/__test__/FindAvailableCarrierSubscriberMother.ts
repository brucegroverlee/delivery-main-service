import DeliveryId from '../../../../domain/DeliveryId';
import CarrierMother from '../../../../domain/__test__/CarrierMother';
import CarrierDTO from '../../../CarrierDTO';
import carrierMapper from '../../../CarrierMapper';
import { CarrierModel } from '../../../sequelize/SequelizeCarrierRepository';

class FindAvailableCarrierSubscriberMother {
  static async givenAnAvailableCarrier(): Promise<{ carrier: CarrierDTO; deliveryId: string }> {
    const carrier = CarrierMother.givenACarrier();

    const carrierDTO: CarrierDTO = carrierMapper.fromDomain(carrier).toDTO();

    carrierDTO.location = {
      address: '',
      latitude: 0,
      longitude: 0,
    };

    await CarrierModel.create(carrierDTO);

    return {
      carrier: carrierDTO,
      deliveryId: DeliveryId.generate().value,
    };
  }
}

export default FindAvailableCarrierSubscriberMother;
