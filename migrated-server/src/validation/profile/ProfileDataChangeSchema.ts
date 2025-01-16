import Joi from 'joi';

const profileDataChangeSchema = Joi.object({
    field: Joi.string().required(),
    value: Joi.string().required() 
})

export default profileDataChangeSchema;