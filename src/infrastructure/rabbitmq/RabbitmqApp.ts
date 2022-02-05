import amqp from 'amqplib';
import debug from 'debug';
import config from '../config';

const logger = debug('server:infrastructure:RabbitmqApp');

interface SubscriberPayload extends Object {}

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
    if (this.topicNames[topicName]) {
      this.topicNames[topicName].push(callback);
    } else {
      this.topicNames[topicName] = [callback];
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

  private async proxyCallback(payload: amqp.ConsumeMessage | null): Promise<void> {
    if (!payload) {
      logger("The message's payload is empty");

      return;
    }

    const topicName: string = payload.fields.routingKey;
    const message = JSON.parse(payload.content.toString());

    logger(`[<= Recieved] ${topicName}:'${message}'`);

    if (this.topicNames[topicName]) {
      const callbacks = this.topicNames[topicName].map((callback) => callback(message));

      await Promise.all(callbacks);
    } else {
      logger(`There is not a saved callback for this 'topic name': ${topicName}`);
    }

    await this.channel!.ack(payload);
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
