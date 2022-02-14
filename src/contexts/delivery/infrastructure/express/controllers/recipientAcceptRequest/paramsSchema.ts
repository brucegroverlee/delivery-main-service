import Joi from 'joi';

const recipientAcceptRequestParamsSchema = Joi.object({
  deliveryId: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
});

export default recipientAcceptRequestParamsSchema;
