import Carrier from '../../domain/Carrier';
import CarrierFinderService from '../../domain/CarrierFinderService';
import CarrierLocation from '../../domain/CarrierLocation';
import { CarrierModel } from './SequelizeCarrierRepository';
import carrierMapper from '../CarrierMapper';

class SequelizeCarrierFinderService implements CarrierFinderService {
  async findAvailable(location: CarrierLocation): Promise<Carrier> {
    const carriers = await CarrierModel.findAll();

    return carrierMapper.fromDTO(carriers[0].toJSON()).toDomain();
  }
}

export const sequelizeCarrierFinderService = new SequelizeCarrierFinderService();

export default SequelizeCarrierFinderService;
