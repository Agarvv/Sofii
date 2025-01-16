import express from 'express';
import { validateRequest } from '@middleware/ValidationMiddleware'; 
import { registerSchema } from '@validation/auth/RegisterSchema'; 
import { loginSchema } from '@validation/auth/LoginSchema';
import { sendResetPasswordSchema } from '@validation/auth/SendResetPasswordSchema'
import { resetPasswordSchema } from '@validation/auth/ResetPasswordSchema'; 
import AuthController from '@controllers/auth/AuthController';
import GoogleController from '@controllers/auth/GoogleController';
import GithubController from '@controllers/auth/GithubController';

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

authRouter.get('/google', 
  GoogleController.authenticate
)

authRouter.get('/google/callback', 
  GoogleController.callback
)

authRouter.get('/github',
  GithubController.authenticate
)

authRouter.get('/github/callback',
  GithubController.callback
)

export default authRouter;

