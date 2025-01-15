import Joi from 'joi';

const blockUserSchema = Joi.object({
    userId: Joi.number().required()
})

export default blockUserSchema;