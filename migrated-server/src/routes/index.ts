import express from 'express';
import authRouter from './auth/AuthRoutes';


const router = express.Router();

router.use('/api/sofii/auth', authRouter);

export default router;