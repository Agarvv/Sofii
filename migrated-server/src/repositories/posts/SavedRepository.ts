import Saved from '@models/posts/SavedPost'
import Post from '@models/posts/Post';
import User from '@models/users/User';
import Likes from '@models/posts/Likes';
import Comment from '@models/posts/comments/Comment';

class SavedRepository {
    public static async getSaved(postId: number, userId: number): Promise<Saved | null> {
        return Saved.findOne({
            where: {
                user_id: userId,
                post_id: postId 
            }
        })
    }

    public static async getSaveds(userId: number) {
  const saveds = await Saved.findAll({
    where: {
      user_id: userId
    },
    include: [{
      model: Post,  
      as: 'saved_post',
      include: [
            {
                model: User,
                as: 'user',
                attributes: ['username', 'profilePicture', 'id']
            },
            {
                model: Comment,
                as: 'postComments',
                attributes: ['comment_content'],
                include: [
                    {
                        model: User,
                        as: 'commentUser',
                        attributes: ['username', 'profilePicture', 'id']
                    }
                ]
            },
            {
                model: Likes,
                as: 'postLikes'
            },
            {
                model: Saved,
                as: 'saved_post'
            }
        ]
        
    }]
  });

  return saveds; 
}

}
export default SavedRepository; 