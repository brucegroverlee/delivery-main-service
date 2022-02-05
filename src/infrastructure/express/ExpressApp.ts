import Express, { Application } from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import debug from 'debug';
import helmet from 'helmet';
import morgan from 'morgan';
import config from '../config';
import errorHandler from './middlewares/errorHandler';
import NotFoundError from './errors/NotFoundError';

import pkg from '../../../package.json';

const logger = debug('server:infrastructure:ExpressApp');

class ExpressApp {
  public app: Application;

  constructor(routers: Express.Router[]) {
    this.app = Express();

    this.loadMiddleware();

    this.loadRouters(routers);

    this.loadNotFoundError();

    this.loadHandleError();
  }

  // eslint-disable-next-line max-lines-per-function
  public loadMiddleware(): void {
    this.app.use(cors());

    this.app.use(helmet());

    this.app.use(bodyParser.json());

    // don't show the log when it is test
    if (config.env !== 'test' && config.env !== 'test.local') {
      // use morgan to log at command line
      this.app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
    }

    this.app.use((req, res, next) => {
      res.set('X-Api-Version', pkg.version);

      next();
    });
  }

  private loadRouters(routers: Express.Router[]): void {
    routers.forEach((router) => {
      this.app.use(router);
    });
  }

  private loadNotFoundError(): void {
    // eslint-disable-next-line no-unused-vars
    this.app.all('*', (req, res) => {
      throw new NotFoundError();
    });
  }

  private loadHandleError(): void {
    this.app.use(errorHandler);
  }

  public listen(): void {
    if (config.env !== 'test' && config.env !== 'test.local') {
      this.app.listen(config.server.port, () => {
        logger(`${config.env} server v${pkg.version} running on port ${config.server.port}`);
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public async runServices(services: Promise<any>[]): Promise<void> {
    await Promise.all(services);
  }

  public async start(services: Promise<any>[]): Promise<void> {
    await this.runServices(services);

    this.listen();
  }
}

export default ExpressApp;
