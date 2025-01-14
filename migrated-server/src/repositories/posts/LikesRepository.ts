import Likes from '@models/posts/Likes';
import CommentLikes from '@models/posts/comments/CommentLikes';
import CommentAwnsersLikes from '@models/posts/comments/CommentAwnsersLikes';


class LikesRepository {
    public static async getPostLike(postId: number, userId:  number): Promise<Likes | null> {
        return await Likes.findOne({
            where: {
                user_id: userId,
                post_id: postId 
            }
        })
    }
    
    public static async getCommentLike(userId: number, postId: number, commentId: number)
    : Promise<CommentLikes | null> {
        return await CommentLikes.findOne({
            where: {
                user_id: userId,
                comment_id: commentId,
                post_id: postId
            }
        })
    }
    
    public static async getAnswerLike(userId: number, postId: number, commentId: number, answerId: number)
    : Promise<CommentAwnsersLikes | null> {
        return await CommentAwnsersLikes.findOne({
            where: {
                user_id: userId,
                post_id: postId,
                comment_id: commentId, 
                awnser_id: answerId 
            }
        })
    } 
}

export default LikesRepository; 