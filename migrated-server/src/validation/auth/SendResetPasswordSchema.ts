import Joi from 'joi';

export const sendResetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});
