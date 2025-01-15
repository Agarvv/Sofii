import { Request, Response } from 'express'
import PostsService from '@services/content/posts/PostsService'

class PostsController {
    public static async createPost(req: Request, res: Response): Promise<void> {
        const { description, picture } = req.body; 
        
        const userId = 1; 
        
        await PostsService.createPost(description, picture, userId); 
        
        res.status(201).json({
            message: "Post Created!"
        })
    }
    
    public static async GetPosts(req: Request, res: Response) {
        const posts = await PostsService.getPosts(); 
        
        res.status(200).json({
            "posts": posts
        })
    }
    
    public static async GetPostById(req: Request, res: Response) {
        const post = await PostsService.getPostDetails(Number(req.params.id)); 
        
        res.status(200).json({
            "post": post
        })
    }
    
    public static async likeOrUnlike(req: Request, res: Response) {
        const { postId } = req.body; 
        
        
        const likedOrUnliked = await PostsService.likeOrDislike(postId, req.user); 
        
        res.status(200).json({
            message: likedOrUnliked
        })
    }
    
    public static async saveOrUnsave(req: Request, res: Response) {
        const { postId } = req.body; 
        
        const savedOrUnsaved = await PostsService.saveOrUnsave(postId, req.user.id); 
        
        res.status(200).json({
            message: savedOrUnsaved
        })
    }
}

export default PostsController; 