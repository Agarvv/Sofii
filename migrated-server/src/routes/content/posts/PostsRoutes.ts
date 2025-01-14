import express from 'express';
import commentRoutes from './CommentRoutes';
import PostsController from '@controllers/content/posts/PostsController'
import { postCreationSchema } from '@validation/posts/PostCreationSchema'
import { validateRequest } from '@middleware/ValidationMiddleware'

const postsRouter = express.Router(); 
postsRouter.use('/comments', commentRoutes)

postsRouter.get('/', 
  PostsController.GetPosts
);

postsRouter.get('/:id', 
  PostsController.GetPostById
);

postsRouter.post('/', 
  validateRequest(postCreationSchema),
  PostsController.createPost
);

postsRouter.post('/like', 
  validateRequest(postCreationSchema),
  PostsController.likeOrUnlike
);

export default postsRouter; 