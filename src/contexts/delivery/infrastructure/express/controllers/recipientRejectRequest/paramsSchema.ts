import Joi from 'joi';

const recipientRejectRequestParamsSchema = Joi.object({
  deliveryId: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
});

export default recipientRejectRequestParamsSchema;
