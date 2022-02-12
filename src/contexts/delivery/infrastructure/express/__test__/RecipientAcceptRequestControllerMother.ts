import { faker } from '@faker-js/faker';
import DeliveryId from '../../../domain/DeliveryId';
import DeliveryStatus from '../../../domain/DeliveryStatus';
import UserId from '../../../domain/UserId';
import DeliveryDTO from '../../DeliveryDTO';
import { DeliveryModel } from '../../sequelize/SequelizeDeliveryRepository';

interface UserDTO {
  userId: string;
  userLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
}

class RecipientAcceptRequestControllerMother {
  static async givenAJustCreatedDelivery(): Promise<{ delivery: DeliveryDTO; recipient: UserDTO }> {
    const sender = {
      userId: UserId.generate().value,
      userLocation: {
        address: faker.address.direction(),
        latitude: Number(faker.address.latitude()),
        longitude: Number(faker.address.longitude()),
      },
    };

    const recipient = {
      userId: UserId.generate().value,
      userLocation: {
        address: faker.address.direction(),
        latitude: Number(faker.address.latitude()),
        longitude: Number(faker.address.longitude()),
      },
    };

    const delivery: DeliveryDTO = {
      id: DeliveryId.generate().value,
      senderId: sender.userId,
      senderLocation: sender.userLocation,
      recipientId: recipient.userId,
      recipientLocation: recipient.userLocation,
      status: DeliveryStatus.CREATED,
      fare: null,
      carrierId: null,
      startedTime: null,
      completedTime: null,
    };

    await DeliveryModel.create(delivery);

    return {
      delivery,
      recipient,
    };
  }
}

export default RecipientAcceptRequestControllerMother;
