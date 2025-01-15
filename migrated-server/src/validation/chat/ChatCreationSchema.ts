import Joi from 'joi';

const chatCreationSchema = Joi.object({
    receiverId: Joi.number().required()
})

export default chatCreationSchema;