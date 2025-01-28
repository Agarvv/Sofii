import Post from '@models/posts/Post';
import User from '@models/users/User'
import { Op } from 'sequelize'
import Likes from '@models/posts/Likes'
import Saved from '@models/posts/SavedPost'
import Comment from '@models/posts/comments/Comment'
import Follower from '@models/users/Followers';
import Friends from '@models/users/Friends';

class SearchRepository {
    public static async search(query: string): Promise<{ posts: Post[], users: User[] }>{
        const postsResults = await Post.findAll({
            where: {
                description: {
                    [Op.like]: `%${query}%`
                }
            },
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: Likes,
                    as: 'postLikes'
                },
                {
                    model: Comment,
                    as: 'postComments'
                },
                {
                    model: Saved,
                    as: 'saved_post'
                }
            ]
        });
        
        const usersResults = await User.findAll({
    where: {
        username: {
            [Op.like]: `%${query}%`
        }
    },
    include: [
        {
            model: User, 
            as: 'followers',
            through: { model: Follower, as: 'follower' } as any 
        },
        {
            model: User,
            as: 'friends',
            through: { model: Friends, as: 'friends' } as any
        }
    ]
});
        
        return { posts: postsResults, users: usersResults }
    }
} 

export default SearchRepository;