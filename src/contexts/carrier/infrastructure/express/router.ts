import express from 'express';

import createCarrierController from './controllers/createCarrier';

const carriers = express.Router();

carriers.post('/carriers', createCarrierController());

export default carriers;
