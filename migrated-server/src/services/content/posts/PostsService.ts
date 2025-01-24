import Post from '@models/posts/Post';
import PostRepository from '@repositories/posts/PostsRepository'
import LikesRepository from '@repositories/posts/LikesRepository';
import SavedRepository from '@repositories/posts/SavedRepository'
import Likes from '@models/posts/Likes';
import Saved from '@models/posts/SavedPost'
import CustomError from '@outils/CustomError';
import NotificationsService from '@services/notifications/NotificationsService';
import websocket from '@websocket/websocket'
import User from '@models/users/User';
import Account from '../../../types/Account';
import Comment from '@models/posts/comments/Comment';

class PostsService {
    public static async createPost(description: string, picture: string, userId: number): Promise<void> {
        const io = websocket.getIO(); 
        
        const newPost = await Post.create({
            description: description,
            postPicture: picture,
            user_id: userId,
        }, {
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
                    model: Saved,
                    as: 'saved_post'
                },
                {
                    model: Comment as any,
                    as: 'postComments'
                }
              ]
        });
        
        io.emit('createdPost', newPost);
    }
    
    public static async getPosts(): Promise<any> {
        return await PostRepository.findAllPosts()
    } 
    
    public static async getPostDetails(postId: number): Promise<any> {
        
        const post = await PostRepository.getPostDetails(postId); 
        
        return post; 
    }   
    
    public static async deletePostById(id: number): Promise<void> {
       const post = await PostRepository.getPostById(id); 
       await post.destroy(); 
    }

    public static async likeOrDislike(postId: number, user: Account): Promise<string> {
       const io = websocket.getIO(); 
       
       const postLike = await LikesRepository.getPostLike(postId, user.user_id); 

       const post = await PostRepository.getPostWithoutDetails(postId); 

       if(!post) {
        throw new CustomError("Post not found", 404)
       }

       if(postLike) {
          await postLike.destroy();
          io.emit('unlikePost', postLike); 
          return "Post Unliked!"
       }

       const newLike = await Likes.create({
        post_id: postId,
        user_id: user.user_id
       })
       
       io.emit('likePost', newLike)
       
       if(user.user_id !== post.user_id) {
       await NotificationsService.sendNotificationToUser(post.user_id, user.username, user.user_id, post, null, 'POST_LIKED')
       }
       
       
       return "Post Liked!"
    }
    
    public static async saveOrUnsave(postId: number, userId: number): Promise<string> {
        const io = websocket.getIO(); 
        const saved = await SavedRepository.getSaved(postId, userId); 

        if(saved) {
            await saved.destroy(); 
            io.emit('unsavedPost', saved)
            return "¡Post Unsaved!"
        }
        
        const newSaved = await Saved.create({
            user_id: userId,
            post_id: postId
        })
        
        io.emit('savedPost', newSaved)
        return "¡Post Saved!"
    }

    public static async getSaveds(userId: number) {
        return await SavedRepository.getSaveds(userId); 
    }
    
}

export default PostsService;