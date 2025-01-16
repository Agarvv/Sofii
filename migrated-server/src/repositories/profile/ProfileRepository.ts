import User from '@models/users/User'
import Post from '@models/posts/Post';
import Comment from '@models/posts/comments/Comment';
import Likes from '@models/posts/Likes';
import Friends from '@models/users/Friends';
import FriendRequest from '@models/users/FriendRequest';
import Saved from '@models/posts/SavedPost';
import Blocked from '@models/users/Blocked';


class ProfileRepository {
    public static async getUserProfile(userId: number): Promise<User | null> {
        return await User.findOne({
  where: { id: userId },
  include: [
    {
      model: Post,
      as: 'posts',
      include: [
        { model: User, as: 'user' },
        { model: Comment, as: 'postComments' },
        { model: Likes, as: 'postLikes' },
        { model: Saved, as: 'saved_post' }
      ]
    },
    {
      model: FriendRequest,
      as: 'sentRequests'
    },
    {
      model: FriendRequest,
      as: 'receivedRequests'
    },
    {
      model: User,
      as: 'followers'
    },
    {
      model: User,
      as: 'following'
    },
    {
      model: User,
      as: 'friends', 
      through: { 
        model: Friends,
        attributes: []  
      } as any  
    },
    {
      model: User,
      as: 'friendsOf', 
      through: { 
        model: Friends,
        attributes: []  
      } as any  
    },
    {
      model: Blocked,
      as: 'users_blocked_me'
    }
  ]
});
        
        
    }
}

export default ProfileRepository;