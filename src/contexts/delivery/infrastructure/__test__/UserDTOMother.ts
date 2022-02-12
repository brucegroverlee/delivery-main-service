import { faker } from '@faker-js/faker';
import UserId from '../../domain/UserId';

export interface UserDTO {
  userId: string;
  userLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
}

class UserDTOMother {
  static createRandom(): UserDTO {
    return {
      userId: UserId.generate().value,
      userLocation: {
        address: faker.address.direction(),
        latitude: Number(faker.address.latitude()),
        longitude: Number(faker.address.longitude()),
      },
    };
  }
}

export default UserDTOMother;
