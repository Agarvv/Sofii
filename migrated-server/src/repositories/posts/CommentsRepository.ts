import Comment from '@models/posts/comments/Comment';
import CommentAnswer from '@models/posts/comments/CommentAwnser';
import User from '@models/users/User';
import CommentLikes from '@models/posts/comments/CommentLikes';
import CommentDislikes from '@models/posts/comments/CommentDislikes';
import CommentAwnsersLikes from '@models/posts/comments/CommentAwnsersLikes';
import CommentAwnsersDislikes from '@models/posts/comments/CommentAwnsersDislikes';

class CommentsRepository {
    public static async findCommentById(id: number): Promise<Comment> {
        return await Comment.findOne({
                        where: { id: comment.id },
                        include: [
                            { model: User, as: 'commentUser' },
                            { model: CommentLikes, as: 'comment_likes' },
                            { model: CommentDislikes, as: 'comment_dislikes' },
                            {
                                model: CommentAnswer,
                                as: 'awnsers',
                                include: [
                                    { model: User, as: 'awnser_user' },
                                    { model: CommentAwnsersLikes, as: 'awnser_likes' },
                                    { model: CommentAwnsersDislikes, as: 'awnser_dislikes' }
                    ]
                }
            ]
        });
    }
    
    public static async findAnswerById(id: number) {
        return await CommentAnswer.findOne({
                where: { id: newCommentAwnser.id },
                include: [
                    { model: User, as: 'awnser_user' },
                    { model: CommentAwnsersLikes, as: 'awnser_likes' },
                    { model: CommentAwnsersDislikes, as: 'awnser_dislikes' }
                ]
            });
    }
}

export default CommentsRepository; 