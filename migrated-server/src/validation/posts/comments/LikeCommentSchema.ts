import Joi from 'joi';

export const likeCommentSchema = Joi.object({
  commentId: Joi.number().required(),
  postId: Joi.number().required
});
