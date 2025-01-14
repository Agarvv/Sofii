import Joi from 'joi';

const likePostSchema = Joi.object({
    postId: Joi.number().required()
})

export default likePostSchema;