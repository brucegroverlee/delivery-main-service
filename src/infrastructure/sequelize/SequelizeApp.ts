import { Sequelize } from 'sequelize';
import config from '../config';

class SequelizeApp {
  readonly sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
      host: config.mysql.host,
      port: config.mysql.port as number,
      dialect: 'mysql',
      logging: false,
    });
  }

  public async connect(): Promise<void> {
    await this.sequelize.sync();
  }
}

export const sequelizeApp = new SequelizeApp();

export default SequelizeApp;
