import express from 'express';
import { validateRequest } from '../../middleware/ValidationMiddleware'; 
import { registerSchema } from '../../validation/auth/RegisterSchema'; 
import { loginSchema } from '../../validation/auth/LoginSchema';
import AuthController from '../../controllers/auth/AuthController';

const authRouter = express.Router();

authRouter.post('/register', 
  //validateRequest(registerSchema), 
  AuthController.registerUser
);

authRouter.post('/login', 
  validateRequest(loginSchema), 
  AuthController.loginUser
);

authRouter.post('/send-reset-password', (_, res) => {
  res.status(501).send("Not implemented.");
});

authRouter.post('/reset-password', (_, res) => {
  res.status(501).send("Not implemented.");
});

export default authRouter;