import amqp from 'amqplib';
import debug from 'debug';
import config from '../config';

const logger = debug('server:infrastructure:RabbitmqApp');

interface SubscriberPayload {
  [key: string]: any;
}

type SubscriberCallback = (data: SubscriberPayload) => Promise<void>;

interface TopicNames {
  [key: string]: SubscriberCallback[];
}

class RabbitmqApp {
  private url: string;
  private connectionName: string;
  private exchangeName: string;
  private exchangeType: string;
  private queueName: string;
  private topicNames: TopicNames;
  private connection: amqp.Connection | null;
  private channel: amqp.Channel | null;

  constructor(url: string, connectionName: string, exchangeName: string, exchangeType: string, queueName: string) {
    this.url = url;
    this.connectionName = connectionName;
    this.exchangeName = exchangeName;
    this.exchangeType = exchangeType;
    this.queueName = queueName;
    this.topicNames = {};
    this.connection = null;
    this.channel = null;
  }

  public subscribe(topicName: string, callback: SubscriberCallback): void {
    const _topicName = process.env.TEST_CONTEXT ? 'test.' + topicName : topicName;

    if (this.topicNames[_topicName]) {
      this.topicNames[_topicName].push(callback);
    } else {
      this.topicNames[_topicName] = [callback];
    }
  }

  public async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.url, {
        clientProperties: { connection_name: this.connectionName },
      });

      this.channel = await this.connection.createChannel();

      const assertedExchange = await this.channel.assertExchange(this.exchangeName, this.exchangeType, {
        durable: true,
      });

      const assertedQueue = await this.channel.assertQueue(this.queueName, {
        durable: true,
      });

      const subscribers = Object.keys(this.topicNames).map((topicName) =>
        this.channel!.bindQueue(this.queueName, this.exchangeName, topicName),
      );

      await Promise.all(subscribers);

      await this.channel!.consume(this.queueName, this.proxyCallback.bind(this), {
        noAck: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async close() {
    await this.connection!.close();
  }

  private async proxyCallback(payload: amqp.ConsumeMessage | null): Promise<void> {
    if (!payload) {
      logger("The message's payload is empty");

      return;
    }

    try {
      const topicName: string = payload.fields.routingKey;
      const message = JSON.parse(payload.content.toString());

      logger(`[<= Recieved] ${topicName}:'${payload.content.toString()}'`);

      if (this.topicNames[topicName]) {
        const callbacks = this.topicNames[topicName].map((callback) => callback(message));

        await Promise.all(callbacks);

        await this.channel!.ack(payload);
      } else {
        if (!process.env.TEST_CONTEXT) await this.channel!.nack(payload);

        logger(`There is not a saved callback for this 'topic name': ${topicName}`);
      }
    } catch (error) {
      if (!process.env.TEST_CONTEXT) await this.channel!.nack(payload);

      console.error(error);
    }
  }

  public publish(topicName: string, message: SubscriberPayload): void {
    this.channel!.publish(this.exchangeName, topicName, Buffer.from(JSON.stringify(message)));
    logger(`[=> Sent] ${topicName}: '${JSON.stringify(message)}'`);
  }
}

export const rabbitmqApp = new RabbitmqApp(
  config.rabbitmq.url,
  config.rabbitmq.connectionName,
  config.rabbitmq.exchange,
  config.rabbitmq.exchangeType,
  config.rabbitmq.queue,
);

export default RabbitmqApp;
