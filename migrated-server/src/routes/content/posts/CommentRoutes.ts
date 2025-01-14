import express from 'express';
import { validateRequest } from '@middleware/ValidationMiddleware'
import CommentController from '@controllers/content/posts/comments/CommentController'
import { createCommentSchema } from '@validation/content/comments/CreateCommentSchema'
import { answerCommentSchema } from '@validation/content/comments/AnswerCommentSchema'
import { likeCommentSchema } from '@validation/content/comments/LikeCommentSchema'
import { dislikeCommentSchema } from '@validation/content/comments/DislikeCommentSchema'
import { likeCommentAnswerSchema } from '@validation/content/comments/LikeCommentAnswerSchema'
import { dislikeCommentAnswerSchema } from '@validation/content/comments/DislikeCommentAnswerSchema'

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