import * as dotenv from 'dotenv';

if (!process?.env?.NODE_ENV) {
  dotenv.config();
}

const dev = 'development';

const config = {
  env: process.env.NODE_ENV || dev,
  server: {
    port: process.env.PORT || 4005,
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE || '',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || 'amqp://localhost',
    connectionName: process.env.RABBITMQ_CONNECTION_NAME || '',
    exchange: process.env.RABBITMQ_EXCHANGE || '',
    exchangeType: process.env.RABBITMQ_EXCHANGE_TYPE || 'topic',
    queue: process.env.RABBITMQ_QUEUE || '',
  },
  swagger: {
    TITLE: process.env.SWAGGER_TITLE || 'Service API',
    DESCRIPTION: process.env.SWAGGER_DESCRIPTION || '',
    SERVER: process.env.SWAGGER_SERVER || 'https://localhost:4005',
  },
};

export default config;
