import axios, { AxiosRequestConfig } from 'axios';
import DomainEventDTO from '../../contexts/shared/infrastructure/DomainEventDTO';

interface DomainEventQuery {
  aggregateId: string;
  eventName: string;
}

interface MessageQuery {
  routing_key: string;
}

interface Message {
  payload_bytes: number;
  redelivered: boolean;
  exchange: string;
  routing_key: string;
  message_count: number;
  properties: {
    headers: any;
  };
  payload: string;
  payload_encoding: string;
}

const rabbitmqHttpApi = {
  vhost: process.env.RABBITMQ_VHOST,
  queue: process.env.RABBITMQ_QUEUE_TEST,
  async findDomainEvent(query: DomainEventQuery): Promise<DomainEventDTO | null> {
    const messages = await this.findMessage({
      routing_key: query.eventName,
    });

    const eventDomainMessage = messages.find(
      (message) => (JSON.parse(message.payload) as DomainEventDTO).aggregateId === query.aggregateId,
    );

    if (!eventDomainMessage) return null;

    return JSON.parse(eventDomainMessage.payload) as DomainEventDTO;
  },
  async findMessage(query: MessageQuery): Promise<Message[]> {
    const data = JSON.stringify({
      count: 10,
      ackmode: 'ack_requeue_true',
      encoding: 'auto',
    });

    const config: AxiosRequestConfig = {
      method: 'post',
      url: `http://localhost:15672/api/queues/${this.vhost}/${this.queue}/get`,
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: 'guest',
        password: 'guest',
      },
      data: data,
    };

    const response = await axios(config);
    return (response.data as Message[]).filter((message) => message.routing_key === query.routing_key);
  },
  async purgeQueue(): Promise<void> {
    const config: AxiosRequestConfig = {
      method: 'delete',
      url: `http://localhost:15672/api/queues/${this.vhost}/${this.queue}/contents`,
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: 'guest',
        password: 'guest',
      },
    };

    await axios(config);
  },
};

export default rabbitmqHttpApi;
