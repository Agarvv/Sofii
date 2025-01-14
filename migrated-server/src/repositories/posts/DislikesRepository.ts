
import CommentDislikes from '@models/posts/comments/CommentDislikes';
import CommentAwnsersDislikes from '@models/posts/comments/CommentAwnsersDislikes';

class DislikesRepository {
    public static async getCommentDislike(userId: number, postId: number, commentId: number) {
        return await CommentDislikes.findOne({
            where: {
                user_id: userId,
                comment_id: commentId,
                post_id: postId 
            }
        })
    }
    
    public static async getAnswerDislike(userId: number, postId: number, commentId: number, answerId: number) {
        return await CommentAwnsersDislikes.findOne({
            where: {
                user_id: userId,
                comment_id: commentId,
                post_id: postId,
                awnser_id: answerId 
            }
        })
    }
}

export default DislikesRepository; 