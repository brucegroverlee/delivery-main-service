import amqp from 'amqplib';

// process.env.DEBUG = 'server:*';

// MYSQL
process.env.MYSQL_HOST = 'localhost';
process.env.MYSQL_PORT = '3306';
process.env.MYSQL_DATABASE = 'delivery_test';
process.env.MYSQL_USER = 'root';
process.env.MYSQL_PASSWORD = '123456';

// RABBITMQ
process.env.RABBITMQ_URL = 'amqp://localhost';
process.env.RABBITMQ_CONNECTION_NAME = 'delivery_main_service_test';
process.env.RABBITMQ_EXCHANGE = 'delivery_event_bus_test';
process.env.RABBITMQ_EXCHANGE_TYPE = 'topic';
process.env.RABBITMQ_QUEUE = 'delivery_main_service_queue_test';
process.env.RABBITMQ_QUEUE_TEST = 'delivery_queue_test';
process.env.RABBITMQ_VHOST = '%2F';

import { DeliveryModel } from '../../contexts/delivery/infrastructure/sequelize/SequelizeDeliveryRepository';
import rabbitmqHttpApi from '../rabbitmq/rabbitmqHttpApi';

async function createRabbitmqQueueTest() {
  const QUEUE_TEST = process.env.RABBITMQ_QUEUE_TEST!;

  const connection = await amqp.connect(process.env.RABBITMQ_URL as string, {
    clientProperties: { connection_name: 'delivery_setup_files_test' },
  });

  const channel = await connection.createChannel();

  const assertedExchange = await channel.assertExchange(
    process.env.RABBITMQ_EXCHANGE as string,
    process.env.RABBITMQ_EXCHANGE_TYPE as string,
    {
      durable: true,
    },
  );

  const assertedQueue = await channel.assertQueue(QUEUE_TEST, {
    durable: true,
  });

  await channel.bindQueue(QUEUE_TEST, process.env.RABBITMQ_EXCHANGE as string, 'domain_event.#');

  await connection.close();
}

export default async () => {
  await createRabbitmqQueueTest();
  await DeliveryModel.truncate();
  await rabbitmqHttpApi.purgeQueue();
};
