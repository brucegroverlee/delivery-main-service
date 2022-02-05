import { DataTypes, Sequelize, Model, ModelStatic } from 'sequelize';
import { sequelizeApp } from '../../../../infrastructure/sequelize/SequelizeApp';
import { DeliveryJSON } from '../../domain/Delivery';
import Delivery from '../../domain/Delivery';
import DeliveryId from '../../domain/DeliveryId';
import DeliveryRepository from '../../domain/DeliveryRepository';

class SequelizeDeliveryRepository implements DeliveryRepository {
  private model: ModelStatic<Model<DeliveryJSON, Omit<DeliveryJSON, 'id'>>>;

  constructor(sequelize: Sequelize) {
    this.model = sequelize.define<Model<DeliveryJSON, Omit<DeliveryJSON, 'id'>>>(
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
  }

  async create(delivery: Delivery): Promise<void> {
    await this.model.create(delivery.toJSON());
  }
  async getById(id: DeliveryId): Promise<Delivery | null> {
    throw new Error('Method not implemented.');
  }
  async update(delivery: Delivery): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export const sequelizeDeliveryRepository = new SequelizeDeliveryRepository(sequelizeApp.sequelize);

export default SequelizeDeliveryRepository;
