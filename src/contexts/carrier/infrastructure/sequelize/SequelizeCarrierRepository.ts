import { DataTypes, Model, ModelStatic } from 'sequelize';
import { sequelizeApp } from '../../../../infrastructure/sequelize/SequelizeApp';
import Carrier from '../../domain/Carrier';
import CarrierId from '../../domain/CarrierId';
import CarrierRepository from '../../domain/CarrierRepository';
import carrierMapper from '../CarrierMapper';
import CarrierDTO from '../CarrierDTO';

export const CarrierModel = sequelizeApp.sequelize.define<Model<CarrierDTO, Omit<CarrierDTO, 'id'>>>(
  'carrier',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    status: DataTypes.TINYINT,
    location: DataTypes.JSON,
    deliveryId: DataTypes.UUID,
  },
  {
    tableName: 'carriers',
  },
);

class SequelizeCarrierRepository implements CarrierRepository {
  private model: ModelStatic<Model<CarrierDTO, Omit<CarrierDTO, 'id'>>>;

  constructor(model: ModelStatic<Model<CarrierDTO, Omit<CarrierDTO, 'id'>>>) {
    this.model = model;
  }

  async add(carrier: Carrier): Promise<void> {
    await this.model.create(carrierMapper.fromDomain(carrier).toDTO());
  }

  async getById(id: CarrierId): Promise<Carrier | null> {
    const rawCarrier = await this.model.findByPk(id.value);

    if (!rawCarrier) return null;

    return carrierMapper.fromDTO(rawCarrier.toJSON()).toDomain();
  }

  async update(carrier: Carrier): Promise<void> {
    await this.model.update(carrierMapper.fromDomain(carrier).toDTO(), {
      where: {
        id: carrier.id.value,
      },
    });
  }
}

export const sequelizeCarrierRepository = new SequelizeCarrierRepository(CarrierModel);

export default SequelizeCarrierRepository;
