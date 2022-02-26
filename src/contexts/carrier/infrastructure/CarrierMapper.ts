import DTOMapper from '../../shared/infrastructure/DTOMapper';
import Carrier from '../domain/Carrier';
import CarrierLocation from '../domain/CarrierLocation';
import DeliveryId from '../domain/DeliveryId';
import CarrierId from '../domain/CarrierId';
import CarrierDTO from './CarrierDTO';

const carrierMapper: DTOMapper = {
  fromDomain(carrier: Carrier) {
    return {
      toDTO(): CarrierDTO {
        return {
          id: carrier.id.value,
          status: carrier.status,
          location: carrier.location ? { ...carrier.location } : null,
          deliveryId: carrier.deliveryId ? carrier.deliveryId.value : null,
        };
      },
    };
  },

  fromDTO(carrierDTO: CarrierDTO) {
    return {
      toDomain(): Carrier {
        return new Carrier({
          id: CarrierId.create(carrierDTO.id),
          status: carrierDTO.status,
          location: carrierDTO.location ? CarrierLocation.create(carrierDTO.location) : null,
          deliveryId: carrierDTO.deliveryId ? DeliveryId.create(carrierDTO.deliveryId) : null,
        });
      },
    };
  },
};

export default carrierMapper;
