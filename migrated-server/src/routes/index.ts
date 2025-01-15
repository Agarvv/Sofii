import express from 'express';
import authRouter from './auth/AuthRoutes';
import postsRouter from './content/posts/PostsRoutes'
import usersRouter from './users/UsersRoutes'
import authMiddleware from '@middleware/AuthMiddleware'

const router = express.Router();

router.use('/api/sofii/auth', authRouter);
router.use('/api/sofii/posts', postsRouter); 
router.use('/api/sofii/users', usersRouter)

export default router;