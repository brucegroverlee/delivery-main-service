import DeliveryId from '../../domain/DeliveryId';
import DeliveryStatus from '../../domain/DeliveryStatus';
import DeliveryDTO from '../DeliveryDTO';
import { UserDTO } from './UserDTOMother';

class DeliveryDTOMother {
  static create(sender: UserDTO, recipient: UserDTO): DeliveryDTO {
    return {
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
  }

  static createAJustCreatedStatus(sender: UserDTO, recipient: UserDTO): DeliveryDTO {
    return {
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
  }
}

export default DeliveryDTOMother;
