import ExpressApp from '../infrastructure/express/ExpressApp';
import { rabbitMQEventBus } from '../contexts/shared/infrastructure/rabbitmq/RabbitMQEventBus';
import { sequelizeApp } from '../infrastructure/sequelize/SequelizeApp';
import { rabbitmqApp } from '../infrastructure/rabbitmq/RabbitmqApp';

import swaggerRouter from '../infrastructure/swagger/swaggerRouter';
import deliveryRouter from '../contexts/delivery/infrastructure/express/router';
import deliverySubscribers from '../contexts/delivery/infrastructure/subscribers';

const httpServer = new ExpressApp([swaggerRouter, deliveryRouter]);

rabbitMQEventBus.addSubscribers(deliverySubscribers);

httpServer.start([sequelizeApp.connect(), rabbitmqApp.connect()]);

export { httpServer };
