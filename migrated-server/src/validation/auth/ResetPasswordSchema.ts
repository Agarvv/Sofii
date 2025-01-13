import Joi from 'joi';

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).max(40).required(),
  email: Joi.string().email().required(),
  resetToken: Joi.string().required(), 
});
