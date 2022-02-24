import DeliveryDTO from '../../../../DeliveryDTO';
import { DeliveryModel } from '../../../../sequelize/SequelizeDeliveryRepository';
import UserDTOMother from '../../../../__test__/UserDTOMother';
import DeliveryDTOMother from '../../../../__test__/DeliveryDTOMother';

class CarrierArriveRecipientLocationMother {
  static async givenADelivery(): Promise<{ delivery: DeliveryDTO }> {
    const sender = UserDTOMother.createRandom();

    const recipient = UserDTOMother.createRandom();

    const delivery = DeliveryDTOMother.createAJustCreatedStatus(sender, recipient);

    await DeliveryModel.create(delivery);

    return {
      delivery,
    };
  }
}

export default CarrierArriveRecipientLocationMother;
