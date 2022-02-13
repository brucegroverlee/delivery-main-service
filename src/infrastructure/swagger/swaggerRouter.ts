import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import config from '../config';
import pkg from '../../../package.json';

const swaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: config.swagger.TITLE,
      version: pkg.version,
      description: config.swagger.DESCRIPTION,
    },
    servers: [
      {
        url: config.swagger.SERVER,
      },
    ],
  },
  apis: ['./src/infrastructure/**/*.yml', './src/contexts/**/*.yml'],
};

const swaggerDocument = swaggerJsdoc(swaggerConfig);

const swaggerRouter = express.Router();

swaggerRouter.use('/api-docs', swaggerUi.serve);
swaggerRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default swaggerRouter;
