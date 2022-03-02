import ExpressApp from '../infrastructure/express/ExpressApp';
import RabbitMQEventBus from '../contexts/shared/infrastructure/rabbitmq/RabbitMQEventBus';
import { sequelizeApp } from '../infrastructure/sequelize/SequelizeApp';
import { rabbitmqApp } from '../infrastructure/rabbitmq/RabbitmqApp';

import swaggerRouter from '../infrastructure/swagger/swaggerRouter';
import deliveryRouter from '../contexts/delivery/infrastructure/express/router';
import deliverySubscribers from '../contexts/delivery/infrastructure/subscribers';
import carrierRouter from '../contexts/carrier/infrastructure/express/router';
import carrierSubscribers from '../contexts/carrier/infrastructure/subscribers';

const httpServer = new ExpressApp([swaggerRouter, deliveryRouter, carrierRouter]);

RabbitMQEventBus.addSubscribers(deliverySubscribers);
RabbitMQEventBus.addSubscribers(carrierSubscribers);

httpServer.start([sequelizeApp.connect(), rabbitmqApp.connect()]);

export { httpServer };
