import ExpressApp from '../infrastructure/express/ExpressApp';
import { rabbitMQEventBus } from '../contexts/shared/infrastructure/rabbitmq/RabbitMQEventBus';
import { sequelizeApp } from '../infrastructure/sequelize/SequelizeApp';
import { rabbitmqApp } from '../infrastructure/rabbitmq/RabbitmqApp';

import swaggerRouter from '../infrastructure/swagger/swaggerRouter';
import deliveryRouter from '../contexts/delivery/infrastructure/express/router';
import { assignCarrierIdSubscriber } from '../contexts/delivery/infrastructure/subscribers/AssignCarrierIdSubscriber/AssignCarrierIdSubscriber';

const httpServer = new ExpressApp([swaggerRouter, deliveryRouter]);

rabbitMQEventBus.addSubscribers([assignCarrierIdSubscriber]);

httpServer.start([sequelizeApp.connect(), rabbitmqApp.connect()]);

export { httpServer };
