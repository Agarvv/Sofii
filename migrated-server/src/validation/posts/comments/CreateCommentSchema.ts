import Joi from 'joi';

export const createCommentSchema = Joi.object({
  postId: Joi.number().required(),
  commentValue: Joi.string().required()
});
