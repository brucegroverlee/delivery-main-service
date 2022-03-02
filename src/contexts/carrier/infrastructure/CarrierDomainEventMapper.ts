import DTOMapper from '../../shared/infrastructure/DTOMapper';
import CarrierAssignedDomainEvent from '../domain/CarrierAssignedDomainEvent';
import CarrierDomainEventDTO from './CarrierDomainEventDTO';
import carrierMapper from './CarrierMapper';

const carrierDomainEventMapper: DTOMapper = {
  fromDomain: function (domainEvent: CarrierAssignedDomainEvent) {
    return {
      toDTO(): CarrierDomainEventDTO {
        return {
          data: carrierMapper.fromDomain(domainEvent.data).toDTO(),
          eventName: domainEvent.eventName,
          aggregateId: domainEvent.aggregateId.value,
          eventId: domainEvent.eventId,
          occurredOn: domainEvent.occurredOn,
        };
      },
    };
  },
  fromDTO: function (dto: any): { toDomain: () => any } {
    throw new Error('Function not implemented.');
  },
};

export default carrierDomainEventMapper;
