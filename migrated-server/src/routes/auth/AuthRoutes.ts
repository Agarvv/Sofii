import express, { Request, Response } from 'express';
import { validateRequest } from '../../middleware/ValidationMiddleware'; 
import { registerSchema } from '../../validation/auth/RegisterSchema'; 
import AuthController from '../../controllers/auth/AuthController';

const authRouter = express.Router();

authRouter.post('/register', 
  validateRequest(registerSchema), 
  AuthController.RegisterUser 
);

authRouter.post('/login', (req: Request, res: Response) => {
  res.status(501).send("Not implemented.");
});

authRouter.post('/send-reset-password', (req: Request, res: Response) => {
  res.status(501).send("Not implemented.");
});

authRouter.post('/reset-password', (req: Request, res: Response) => {
  res.status(501).send("Not implemented.");
});

export default authRouter;