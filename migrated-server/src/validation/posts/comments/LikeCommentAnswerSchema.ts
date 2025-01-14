import Joi from 'joi';

export const likeCommentAnswerSchema = Joi.object({
  commentId: Joi.number().required(),
  answerId: Joi.number().required(),
  postId: Joi.number().required()
});
