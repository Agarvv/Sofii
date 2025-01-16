import Post from '@models/posts/Post';
import User from '@models/users/User'
import Likes from '@models/posts/Likes'
import Saved from '@models/posts/SavedPost'
import Comment from '@models/posts/comments/Comment'
const CommentLikes = require('@models/posts/comments/CommentLikes')
const CommentDislikes = require('@models/posts/comments/CommentDislikes')
const CommentAwnsersLikes = require('@models/posts/comments/CommentAwnsersLikes')
const CommentAwnsersDislikes = require('@models/posts/comments/CommentAwnsersDislikes');
const  CommentAnswer  = require('@models/posts/comments/CommentAwnser'); 

class PostsRepository {
    // finds the post with his likes, comments, saved relations.
    public static async getPostById(id: number): Promise<Post> {
        const post = await Post.findOne({
           where: {
              id: id
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
               model: Saved,
               as: 'saved_post'
           },
           {
               model: Comment,
               as: 'postComments'
           }
         ]
      });
     
       return post!; 
    }
    
    public static async findAllPosts(): Promise<any> {
    return await Post.findAll({
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
    });
  }
    
    public static async getPostDetails(id: number): Promise<any> {
        const post = await Post.findOne({
            where: { id: id },
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: Comment,
                    as: 'postComments',
                    include: [
                      {
                          model: User,
                          as: 'commentUser'
                      },
                      {
                          model: CommentLikes,
                          as: 'comment_likes'
                      }, 
                      {
                          model: CommentDislikes,
                          as: 'comment_dislikes'
                      }, 
                    
                      {
                          model: CommentAnswer,
                    as: 'awnsers',
                        include: [
                            {
                                model: User,
                                as: 'awnser_user'
                            },
                            {
                                model: CommentAwnsersLikes,
                                as: 'awnser_likes'
                            },
                            {
                                model: CommentAwnsersDislikes,
                                as: 'awnser_dislikes'
                            }
                        ]
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
        });
    }

    public static async getPostWithoutDetails(id: number): Promise<Post | null> {
        return Post.findOne({
            where: {
                id: id 
            }
        })
    }
    
    
}

export default PostsRepository; 