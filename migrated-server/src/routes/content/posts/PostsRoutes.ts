import express from 'express';
import PostsController from '@controllers/content/posts/PostsController'
import { postCreationSchema } from '@validation/posts/PostCreationSchema'
import { validateRequest } from '@middleware/ValidationMiddleware'

const postsRouter = express.Router(); 

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


export default postsRouter; 