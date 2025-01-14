import express from 'express';
import { validateRequest } from '@middleware/ValidationMiddleware'
import CommentController from '@controllers/content/posts/CommentController';
import { createCommentSchema } from '@validation/posts/comments/CreateCommentSchema';
import { answerCommentSchema } from '@validation/posts/comments/AnswerCommentSchema'
import { likeCommentSchema } from '@validation/posts/comments/LikeCommentSchema'
import { dislikeCommentSchema } from '@validation/posts/comments/DislikeCommentSchema'
import { likeCommentAnswerSchema } from '@validation/posts/comments/LikeCommentAnswerSchema'
import { dislikeCommentAnswerSchema } from '@validation/posts/comments/DislikeCommentAnswerSchema'

const commentRoutes = express.Router(); 

// create comment 
commentRoutes.post('/', 
  validateRequest(createCommentSchema),
  CommentController.comment
);

// answer comment 
commentRoutes.post('/answer', 
  validateRequest(answerCommentSchema),
  CommentController.answerComment
);

// like comment 
commentRoutes.post('/like', 
  validateRequest(likeCommentSchema),
  CommentController.likeComment
);

// dislike comment 
commentRoutes.post('/dislike', 
  validateRequest(dislikeCommentSchema),
  CommentController.dislikeComment
);

// like comment answer
commentRoutes.post('/answers/like', 
  validateRequest(likeCommentAnswerSchema),
  CommentController.likeCommentAnswer
);

// dislike comment answer 
commentRoutes.post('/answers/dislike', 
  validateRequest(dislikeCommentAnswerSchema),
  CommentController.dislikeCommentAnswer
);

export default commentRoutes; 