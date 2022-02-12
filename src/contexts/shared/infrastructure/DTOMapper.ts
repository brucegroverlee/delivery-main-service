import AggregateRoot from '../domain/entities/AggregateRoot';
import DTO from './DTO';

/* interface DTOMapper {
  fromDomain: <D extends AggregateRoot>(
    model: D,
  ) => {
    toDTO: <T extends DTO>() => T;
  };

  fromDTO: <T extends DTO>(
    dto: T,
  ) => {
    toDomain: <D extends AggregateRoot>() => D;
  };
} */

interface DTOMapper {
  fromDomain: (model: any) => {
    toDTO: () => any;
  };

  fromDTO: (dto: any) => {
    toDomain: () => any;
  };
}

export default DTOMapper;
