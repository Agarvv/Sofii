import { Request, Response } from 'express'
import CommentService from '@services/content/posts/CommentService'


class CommentController {
    public static async comment(req: Request, res: Response) {
        const { commentValue, postId } = req.body;
        
        const userId = 1;  
        
        await CommentService.comment(commentValue, postId, userId); 
        
        res.status(201).json({
            "message": "¡Comment Created!"
        })
    }
    
    public static async likeComment(req: Request, res: Response) {
        const { commentId, postId } = req.body; 
        
        const userId = 1; 
        
        const likedOrUnliked = await CommentService.likeOrUnlikeComment(commentId, postId, userId); 
        
        res.status(200).json({
            "message": likedOrUnliked
        })
    }
    
    public static async dislikeComment(req: Request, res: Response) {
        const { commentId, postId } = req.body; 
        
        const userId = 1; 
        
        const dislikedOrUndisliked = await CommentService.dislikeOrUndislikeComment(commentId, postId, userId); 
        
        res.status(200).json({
            "message": dislikedOrUndisliked
        })
    }
    
    public static async answerComment(req: Request, res: Response) {
        const { answerValue, commentId, postId } = req.body; 
        
        const userId = 1; 
        
        await CommentService.answerComment(commentId, postId, userId, answerValue); 
        
        res.status(201).json({
            "message": "¡Comment Answered!"
        })
    }
    
    public static async likeCommentAnswer(req: Request, res: Response) {
        const { commentId, answerId, postId } = req.body; 
        
        const userId = 1; 
        
        const likedOrUnliked = await CommentService.likeOrUnlikeAnswer(answerId, commentId, postId, userId);
        
        res.status(201).json({
            "message": likedOrUnliked 
        })
    }
    
    public static async dislikeCommentAnswer(req: Request, res: Response) {
        const { commentId, answerId, postId } = req.body; 
        
        const userId = 1; 
        
        const dislikedOrUndisliked = await CommentService.dislikeOrUndislikeAnswer(answerId, commentId, postId, userId);
        
        res.status(200).json({
            "message": dislikedOrUndisliked 
        }) 
    }
}

export default CommentController; 