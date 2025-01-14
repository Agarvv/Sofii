import joi from 'joi';

export const postCreationSchema = joi.object({
  description: joi.string().required(),
  picture: joi.string().required()
});
