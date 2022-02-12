import { rabbitmqApp } from '../rabbitmq/RabbitmqApp';

jest.setTimeout(5000);

beforeAll(async () => {});

afterAll(async () => {
  await rabbitmqApp.close();
});
