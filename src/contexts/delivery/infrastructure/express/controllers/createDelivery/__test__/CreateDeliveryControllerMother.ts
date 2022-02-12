import UserDTOMother, { UserDTO } from '../../../../__test__/UserDTOMother';

class CreateDeliveryControllerMother {
  static givenTwoUsers(): { sender: UserDTO; recipient: UserDTO } {
    const sender = UserDTOMother.createRandom();

    const recipient = UserDTOMother.createRandom();

    return {
      sender,
      recipient,
    };
  }
}

export default CreateDeliveryControllerMother;
