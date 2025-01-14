import express from 'express';
import authRouter from './auth/AuthRoutes';
import postsRouter from './content/posts/PostsRoutes'

const router = express.Router();

router.use('/api/sofii/auth', authRouter);
router.use('/api/sofii/posts', postsRouter); 

export default router;