import Post from '@models/posts/Post';
import websocket from '@websocket/websocket';
import PostRepository from '@repositories/posts/PostsRepository'

class PostsService {
    private static io = websocket.getIO();

    public static async createPost(description: string, picture: string, userId: number): Promise<void> {
        
        const newPost = await Post.create({
            description: description,
            postPicture: picture,
            user_id: userId,
        });
        // i need to emit back to the client a post with likes saved and comment relations.
        const fullPost = await PostRepository.getPostById(newPost.id); 
        
        this.io.emit('createdPost', fullPost);
    }
    
    public static async getPosts(): Promise<any> {
        // need posts with some relations.
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
}

export default PostsService;