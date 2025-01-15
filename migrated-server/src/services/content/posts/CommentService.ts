
import CommentsRepository from '@repositories/posts/CommentsRepository' 
import LikesRepository from '@repositories/posts/LikesRepository'
import DislikesRepository from '@repositories/posts/DislikesRepository'
import Comment from '@models/posts/comments/Comment';
import CommentAnswer from '@models/posts/comments/CommentAwnser';
import CommentLikes from '@models/posts/comments/CommentLikes';
import CommentDislikes from '@models/posts/comments/CommentDislikes';
import CommentAwnsersLikes from '@models/posts/comments/CommentAwnsersLikes';
import CommentAwnsersDislikes from '@models/posts/comments/CommentAwnsersDislikes';
import NotificationsService from '@services/notifications/NotificationsService';
import websocket from '@websocket/websocket'



class CommentService {
    public static async comment(commentValue: string, postId: number, user: any): Promise<void> {
        const io = websocket.getIO(); 
        
        const newComment = await Comment.create({
            post_id: postId,
            user_id: user.user_id,
            comment_content: commentValue 
        })
        
        // need to find the comment with his owner relations likes and dislikes to send to the frontend. 
        const fullComment = await CommentsRepository.findCommentById(newComment.id) 
    
        io.emit('newComment', fullComment)
    }
    
    public static async likeOrUnlikeComment(commentId: number, postId: number, user: any): Promise<string> {
        const io = websocket.getIO(); 
        
        const commentLike = await LikesRepository.getCommentLike(user.user_id, postId, commentId);
        
        if(commentLike) {
            await commentLike.destroy(); 
            io.emit('unlikeComment', commentLike)
            return "¡Comment Unliked!"
        }
        
        const newLike = await CommentLikes.create({
            user_id: user.user_id,
            post_id: postId,
            comment_id: commentId 
        })
        
        io.emit('likeComment', newLike)
        return "Comment Liked!"
    }
    
    public static async dislikeOrUndislikeComment(commentId: number, postId: number, userId: number): Promise<string> {
        const io = websocket.getIO(); 
        
        const commentDislike = await DislikesRepository.getCommentDislike(userId, postId, commentId); 
        
        if(commentDislike) {
            await commentDislike.destroy(); 
            io.emit('undislikeComment', commentDislike)
            return "¡Comment Undisliked!"
        }
        
        const newDislike = await CommentDislikes.create({
            user_id: userId,
            comment_id: commentId,
            post_id: postId
        })
        
        io.emit('dislikeComment', newDislike)
        return "¡Comment Disliked!"; 
    }
    
    public static async answerComment
    (
        commentId:  number, 
        postId: number, 
        user: any, 
        answerValue: string
    ): Promise<void> {
        const io = websocket.getIO(); 
        const newAnswer = await CommentAnswer.create({
            post_id: postId,
            comment_id: commentId,
            user_id: user.user_id,
            answer_content: answerValue 
        })
        
        // need to find answer with his sql relations to send to the client.
        const fullAnswer = await CommentsRepository.findAnswerById(newAnswer.id);
    
        io.emit('newCommentAnswer', fullAnswer)
    }
    
    public static async likeOrUnlikeAnswer(answerId: number, commentId: number, postId: number, userId: number) {
        const io = websocket.getIO(); 
        
        const answerLike = await LikesRepository.getAnswerLike(userId, postId, commentId, answerId); 
        
        if(answerLike) {
            await answerLike.destroy(); 
            
           io.emit('unlikeCommentAwnser', answerLike); 
            
            return "¡Answer Unliked!"
        }
        
        const newLike = await CommentAwnsersLikes.create({
            user_id: userId,
            post_id: postId,
            comment_id: commentId,
            awnser_id: answerId
        });
        
        io.emit('likeCommentAwnser', newLike); 
        return "¡Answer Liked!"
    }

    public static async dislikeOrUndislikeAnswer(answerId: number, commentId: number, postId: number, userId: number) {
        const io = websocket.getIO(); 
        
        const answerDislike = await DislikesRepository.getAnswerDislike(userId, postId, commentId, answerId);
        
        if(answerDislike) {
            await answerDislike.destroy(); 
            io.emit('undislikeCommentAwnser', answerDislike)
            return "¡Answer Undisliked!"
        }
        
        const newDislike = await CommentAwnsersDislikes.create({
            user_id: userId,
            comment_id: commentId,
            awnser_id: answerId,
            post_id: postId
        })
        
       io.emit('dislikeCommentAwnser', newDislike)
       return "¡Answer Disliked!"; 
    }
}

export default CommentService; 