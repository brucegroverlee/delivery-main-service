import DeliveryDTO from '../../../../DeliveryDTO';
import { DeliveryModel } from '../../../../sequelize/SequelizeDeliveryRepository';
import UserDTOMother from '../../../../__test__/UserDTOMother';
import DeliveryDTOMother from '../../../../__test__/DeliveryDTOMother';
import DeliveryStatus from '../../../../../domain/DeliveryStatus';

class SenderAcceptDeliveryFareControllerMother {
  static async givenADeliveryWithFareCalculated(): Promise<{ delivery: DeliveryDTO }> {
    const sender = UserDTOMother.createRandom();

    const recipient = UserDTOMother.createRandom();

    const delivery = DeliveryDTOMother.createAJustCreatedStatus(sender, recipient);

    delivery.status = DeliveryStatus.DELIVERY_FARE_CALCULATED;

    await DeliveryModel.create(delivery);

    return {
      delivery,
    };
  }
}

export default SenderAcceptDeliveryFareControllerMother;
