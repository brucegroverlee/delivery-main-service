import express from 'express';

import createDeliveryController from './controllers/createDeliveryController';
import recipientAcceptRequestController from './controllers/recipientAcceptRequestController';

const deliveries = express.Router();

deliveries.post('/deliveries', createDeliveryController());
deliveries.patch('/deliveries/:deliveryId/recipient-accept-request', recipientAcceptRequestController());

export default deliveries;
