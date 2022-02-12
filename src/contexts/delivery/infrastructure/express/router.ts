import express from 'express';

import createDeliveryController from './controllers/createDelivery';
import recipientAcceptRequestController from './controllers/recipientAcceptRequest';

const deliveries = express.Router();

deliveries.post('/deliveries', createDeliveryController());
deliveries.patch('/deliveries/:deliveryId/recipient-accept-request', recipientAcceptRequestController());

export default deliveries;
