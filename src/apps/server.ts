import ExpressApp from '../infrastructure/express/ExpressApp';
import { sequelizeApp } from '../infrastructure/sequelize/SequelizeApp';
import { rabbitmqApp } from '../infrastructure/rabbitmq/RabbitmqApp';

import deliveryRouter from '../contexts/delivery/infrastructure/express/router';

const httpServer = new ExpressApp([deliveryRouter]);

httpServer.start([sequelizeApp.connect(), rabbitmqApp.connect()]);
