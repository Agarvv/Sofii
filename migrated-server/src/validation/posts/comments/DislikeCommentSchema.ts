import Joi from 'joi';

export const dislikeCommentSchema = Joi.object({
  commentId: Joi.number().required(),
  postId: Joi.number().required()
});
