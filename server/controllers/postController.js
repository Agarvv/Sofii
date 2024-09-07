const postService = require('../services/postService')
const Post = require('../models/Post')
const tokenController = require('./tokenController')


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

module.exports = {
    createPost,
    deletePost
}