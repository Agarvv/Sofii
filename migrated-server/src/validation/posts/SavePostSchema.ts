import Joi from 'joi';

const savePostSchema = Joi.object({
    postId: Joi.number().required()
})

export default savePostSchema;