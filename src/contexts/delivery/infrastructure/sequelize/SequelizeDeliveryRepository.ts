import { DataTypes, Model, ModelStatic } from 'sequelize';
import { sequelizeApp } from '../../../../infrastructure/sequelize/SequelizeApp';
import Delivery from '../../domain/Delivery';
import DeliveryId from '../../domain/DeliveryId';
import DeliveryRepository from '../../domain/DeliveryRepository';
import deliveryMapper from '../DeliveryMapper';
import DeliveryDTO from '../DeliveryDTO';

export const DeliveryModel = sequelizeApp.sequelize.define<Model<DeliveryDTO, Omit<DeliveryDTO, 'id'>>>(
  'delivery',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    senderId: DataTypes.UUID,
    senderLocation: DataTypes.JSON,
    recipientId: DataTypes.UUID,
    recipientLocation: DataTypes.JSON,
    status: DataTypes.TINYINT,
    fare: DataTypes.FLOAT,
    carrierId: DataTypes.UUID,
    startedTime: DataTypes.DATE,
    completedTime: DataTypes.DATE,
  },
  {
    tableName: 'deliveries',
  },
);

class SequelizeDeliveryRepository implements DeliveryRepository {
  private model: ModelStatic<Model<DeliveryDTO, Omit<DeliveryDTO, 'id'>>>;

  constructor(model: ModelStatic<Model<DeliveryDTO, Omit<DeliveryDTO, 'id'>>>) {
    this.model = model;
  }

  async create(delivery: Delivery): Promise<void> {
    await this.model.create(deliveryMapper.fromDomain(delivery).toDTO());
  }

  async getById(id: DeliveryId): Promise<Delivery | null> {
    const rawDelivery = await this.model.findByPk(id.value);

    if (!rawDelivery) return null;

    return deliveryMapper.fromDTO(rawDelivery.toJSON()).toDomain();
  }

  async update(delivery: Delivery): Promise<void> {
    await this.model.update(deliveryMapper.fromDomain(delivery).toDTO(), {
      where: {
        id: delivery.id.value,
      },
    });
  }
}

export const sequelizeDeliveryRepository = new SequelizeDeliveryRepository(DeliveryModel);

export default SequelizeDeliveryRepository;
