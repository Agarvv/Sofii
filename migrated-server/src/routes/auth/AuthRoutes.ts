import express, { Request, Response } from 'express';

const authRouter = express.Router();

authRouter.post('/register', (req: Request, res: Response) => {
  res.status(501).send("Not implemented.");
});

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