import DTOMapper from '../../shared/infrastructure/DTOMapper';
import Delivery from '../domain/Delivery';
import DeliveryId from '../domain/DeliveryId';
import UserId from '../domain/UserId';
import Location from '../domain/Location';
import DeliveryFare from '../domain/DeliveryFare';
import CarrierId from '../domain/CarrierId';
import DeliveryDTO from './DeliveryDTO';

const deliveryMapper: DTOMapper = {
  fromDomain(delivery: Delivery) {
    return {
      toDTO(): DeliveryDTO {
        return {
          id: delivery.id.value,
          senderId: delivery.senderId.value,
          senderLocation: { ...delivery.senderLocation },
          recipientId: delivery.recipientId.value,
          recipientLocation: { ...delivery.recipientLocation },
          status: delivery.status,
          fare: delivery.fare ? delivery.fare.value : null,
          carrierId: delivery.carrierId ? delivery.carrierId.value : null,
          startedTime: delivery.startedTime ? delivery.startedTime.toString() : null,
          completedTime: delivery.completedTime ? delivery.completedTime.toString() : null,
        };
      },
    };
  },

  fromDTO(deliveryDTO: DeliveryDTO) {
    return {
      toDomain(): Delivery {
        return new Delivery({
          id: DeliveryId.create(deliveryDTO.id),
          senderId: UserId.create(deliveryDTO.senderId),
          senderLocation: Location.create(deliveryDTO.senderLocation),
          recipientId: UserId.create(deliveryDTO.recipientId),
          recipientLocation: Location.create(deliveryDTO.recipientLocation),
          status: deliveryDTO.status,
          fare: deliveryDTO.fare ? new DeliveryFare(deliveryDTO.fare) : null,
          carrierId: deliveryDTO.carrierId ? CarrierId.create(deliveryDTO.carrierId) : null,
          startedTime: deliveryDTO.startedTime ? new Date(deliveryDTO.startedTime) : null,
          completedTime: deliveryDTO.completedTime ? new Date(deliveryDTO.completedTime) : null,
        });
      },
    };
  },
};

export default deliveryMapper;
