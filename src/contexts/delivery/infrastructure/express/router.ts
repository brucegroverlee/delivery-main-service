import express from 'express';

import getDeliveriesController from './controllers/getDeliveriesController';
import createDeliveryController from './controllers/createDeliveryController';

const deliveries = express.Router();

deliveries.get('/deliveries', getDeliveriesController);
deliveries.post('/deliveries', createDeliveryController());

export default deliveries;
