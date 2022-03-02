import DTOMapper from '../../shared/infrastructure/DTOMapper';
import DeliveryDomainEvent from '../domain/events/DeliveryDomainEvent';
import DeliveryDomainEventDTO from './DeliveryDomainEventDTO';
import deliveryMapper from './DeliveryMapper';

const deliveryDomainEventMapper: DTOMapper = {
  fromDomain: function (domainEvent: DeliveryDomainEvent) {
    return {
      toDTO(): DeliveryDomainEventDTO {
        return {
          data: deliveryMapper.fromDomain(domainEvent.data).toDTO(),
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

export default deliveryDomainEventMapper;
