const postService = require('../services/postService')
const Post = require('../models/Post')
const tokenController = require('./tokenController')

const serveHomePage = async (jwtToken) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwtToken)
        const data = await postService.serveHomePage(userDecoded)
        return data
    } catch (e) {
        throw e
    }
}


const createPost = async (post, user_id, userDecoded, username, userImg, postImg) => {
        try {
            
               const socialpost = await postService.createPost(post, user_id, userDecoded, username, userImg, postImg)
               return socialpost
            
        } catch(e) {
            console.log(e)
       }
}

const deletePost = async (post_id, jwtToken) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwtToken)
        
        const postExists = await Post.findOne({
            where: {
                id: post_id,
                user_id: userDecoded.user_id
            }
        })
        
        if(postExists) {
            const deletedPost = await postService.deletePost(postExists, userDecoded) 
            return deletedPost
        } else {
            throw new Error("Something Is Wrong With The Post That You Want To Delete, Maybe Is Deleted Or Is Not Yours.")
        }
        
    } catch(e) {
        throw e 
    }
}

const findPost = async (p_id) => {
    try {
        const post = await Post.findOne({
            where: { id: post_id },
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
        
        if(!post) {
            throw new Error('Post Not Found')
        }
        
        return post
    } catch(e) {
        throw e
    }
}

module.exports = {
    serveHomePage,
    createPost,
    deletePost,
    findPost
}