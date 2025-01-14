import Joi from 'joi';

export const dislikeCommentAnswerSchema = Joi.object({
  commentId: Joi.number().required(),
  answerId: Joi.number().required(),
  postId: Joi.number().required() 
});
