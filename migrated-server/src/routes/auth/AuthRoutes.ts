import express from 'express';
import { validateRequest } from '@middleware/ValidationMiddleware'; 
import { registerSchema } from '@validation/auth/RegisterSchema'; 
import { loginSchema } from '@validation/auth/LoginSchema';
import { sendResetPasswordSchema } from '@validation/auth/SendResetPasswordSchema'
import { resetPasswordSchema } from '@validation/auth/ResetPasswordSchema'; 
import AuthController from '@controllers/auth/AuthController';

const authRouter = express.Router();

authRouter.post('/register', 
  validateRequest(registerSchema),
  AuthController.registerUser
);

authRouter.post('/login', 
  validateRequest(loginSchema), 
  AuthController.loginUser
);

authRouter.post('/send-reset-password', 
  validateRequest(sendResetPasswordSchema), 
  AuthController.sendResetPassword
);

authRouter.post('/reset-password', 
  validateRequest(resetPasswordSchema), 
  AuthController.resetPassword
);


export default authRouter;