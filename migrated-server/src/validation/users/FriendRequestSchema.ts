import Joi from 'joi';

const friendRequestSchema = Joi.object({
    requestId: Joi.number().required()
})

export default friendRequestSchema;