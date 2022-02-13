import ExpressApp from '../infrastructure/express/ExpressApp';
import { sequelizeApp } from '../infrastructure/sequelize/SequelizeApp';
import { rabbitmqApp } from '../infrastructure/rabbitmq/RabbitmqApp';

import swaggerRouter from '../infrastructure/swagger/swaggerRouter';
import deliveryRouter from '../contexts/delivery/infrastructure/express/router';

const httpServer = new ExpressApp([swaggerRouter, deliveryRouter]);

httpServer.start([sequelizeApp.connect(), rabbitmqApp.connect()]);

export { httpServer };
