import express from 'express';
import authRouter from './auth/AuthRoutes';
import postsRouter from './content/posts/PostsRoutes'
import usersRouter from './users/UsersRoutes'
import authMiddleware from '@middleware/AuthMiddleware'
import chatRouter from './chat/ChatRoutes'
import profileRouter from './profile/ProfileRoutes'
import searchRouter from './search/SearchRoutes'

const router = express.Router();

router.use('/api/sofii/auth', authRouter);
router.use('/api/sofii/posts', postsRouter); 
router.use('/api/sofii/users', usersRouter);
router.use('/api/sofii/chats', chatRouter);
router.use('/api/sofii/search', searchRouter);

router.use('/api/sofii/profile', profileRouter);

export default router;