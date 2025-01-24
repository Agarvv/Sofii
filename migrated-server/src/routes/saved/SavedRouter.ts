
import express from 'express';
import PostsController from '@controllers/content/posts/PostsController';

const savedPostsRouter = express.Router();


savedPostsRouter.get('/', PostsController.getSaveds);

export default savedPostsRouter;