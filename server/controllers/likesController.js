const likesService = require('../services/likesService')
const tokenController = require('../controllers/tokenController')
const Video = require('../models/Video')
const VideoLikes = require('../models/VideoLikes')
const Likes = require('../models/Likes')
const { Op } = require('sequelize')
const Post = require('../models/Post')

const likeVideo = async (jwt_token, video_id) => {
    try {
        
        const userDecoded = await tokenController.verifyJwtToken(jwt_token)
        
        const databaseVideo = await Video.findOne({
            where: { id: video_id }
        })
    
        
        if(!databaseVideo) {
            throw new Error("The video that you want to like does not exist in our system.")
        }
        
        const isLiked = await VideoLikes.findOne({
            where: {
                [Op.and]: [
                 {
                     user_id: userDecoded.user_id,
                     video_id: video_id
                 }
                ]
            }
        })
        
        
        if(isLiked) {
            const unliked = await likesService.unlikeVideo( userDecoded.user_id, video_id) 
            return unliked
        }
        
        
        const liked = await likesService.likeVideo(userDecoded, video_id)
        return liked
        
    } catch(e) {
        throw new Error(e)
    }
}

const likePost = async (jwt_token, post_id) => {
    try {
        const userDecoded = await
        tokenController.verifyJwtToken(jwt_token)
        
        const postExists = await
        Post.findOne({
            where: {
                id: post_id
            }
        })
        
        if(!postExists) {
            throw new Error("The post that you want to like does not exist.")
        }
        
        const isLiked = await
        Likes.findOne({
            where: {
                user_id: userDecoded.user_id,
                post_id: post_id
            }
        })
        
        if(isLiked) {
            const unliked = await
            likesService.unlikePost(userDecoded.user_id, post_id)
            return unliked
        } 
        
        const liked = await
        likesService.likePost(userDecoded.user_id, post_id)
        return liked
        
    } catch(e) {
        throw new Error(e)
    }
}


module.exports = {
    likeVideo,
    likePost
}