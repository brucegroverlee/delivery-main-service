import DeliveryDTO from '../../../../DeliveryDTO';
import { DeliveryModel } from '../../../../sequelize/SequelizeDeliveryRepository';
import UserDTOMother, { UserDTO } from '../../../../__test__/UserDTOMother';
import DeliveryDTOMother from '../../../../__test__/DeliveryDTOMother';

class RecipientAcceptRequestControllerMother {
  static async givenAJustCreatedDelivery(): Promise<{ delivery: DeliveryDTO; recipient: UserDTO }> {
    const sender = UserDTOMother.createRandom();

    const recipient = UserDTOMother.createRandom();

    const delivery = DeliveryDTOMother.createAJustCreatedStatus(sender, recipient);

    await DeliveryModel.create(delivery);

    return {
      delivery,
      recipient,
    };
  }
}

export default RecipientAcceptRequestControllerMother;
