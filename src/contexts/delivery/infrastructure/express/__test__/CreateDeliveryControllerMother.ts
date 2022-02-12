import { faker } from '@faker-js/faker';
import UserId from '../../../domain/UserId';

interface UserDTO {
  userId: string;
  userLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
}

class CreateDeliveryControllerMother {
  static givenTwoUsers(): { sender: UserDTO; recipient: UserDTO } {
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
    return {
      sender,
      recipient,
    };
  }
}

export default CreateDeliveryControllerMother;
