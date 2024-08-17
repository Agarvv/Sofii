const VideoLikes = require('../models/VideoLikes')
const Likes = require('../models/Likes')
const NotificationService = require('../services/NotificationService')

const likeVideo = async (user, video) => {
    try {
       const newLike = await VideoLikes.create({
            video_id: video.id,
            user_id: user.user_id
        })
        
        if(newLike) {
            await NotificationService.sendNotificationToSingleUser(video.video_user_id, user, 'VIDEO_LIKED')
            return 
        }
        
        
    } catch(e) {
        throw new Error(e)
    }
}

const likePost = async (user, post) => {
    try {
       const newLike =  await Likes.create({
            post_id: post.id,
            user_id: user.user_id
        })
        if(newLike) {
            await NotificationService.sendNotificationToSingleUser(post.user_id, user, 'POST_LIKED')
            return 
        }
        
    } catch(e) {
        throw new Error(e)
    }
}

const unlikeVideo = async (user_id, video_id) => {
    try {
        await VideoLikes.destroy({
            where: {
                user_id: user_id,
                video_id: video_id
            }
        })
        const unliked = "video unliked sucesfully"
        return unliked
    } catch(e) {
        throw new Error(e)
    }
}

const unlikePost = async (user_id, post_id) => {
    try {
        await Likes.destroy({
            where: {
                user_id: user_id,
                post_id: post_id
            }
        })
        const unliked = "post unliked sucesfully"
        return unliked
    } catch(e) {
        throw new Error(e)
    }
}


module.exports = {
    likeVideo,
    likePost,
    unlikeVideo,
    unlikePost
}