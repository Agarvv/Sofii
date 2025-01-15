import Joi from 'joi';

const sendFriendRequestSchema = Joi.object({
    userId: Joi.number().required()
})

export default sendFriendRequestSchema;