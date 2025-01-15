import Joi from 'joi';

const followUserSchema = Joi.object({
    userId: Joi.number().required()
})

export default followUserSchema;