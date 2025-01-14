import Joi from 'joi';

export const answerCommentSchema = Joi.object({
  postId: Joi.number().required(),
  commentId: Joi.number().required(),
  answerValue: Joi.string().required()
});
