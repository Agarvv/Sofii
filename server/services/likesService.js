const VideoLikes = require('../models/VideoLikes')
const Likes = require('../models/Likes')

const likeVideo = async (user, video_id) => {
    try {
        await VideoLikes.create({
            video_id: video_id,
            user_id: user.user_id
        })
        const liked = "succes while liking video"
        return liked
        
    } catch(e) {
        throw new Error(e)
    }
}

const likePost = async (user_id, post_id) => {
    try {
        await Likes.create({
            post_id: post_id,
            user_id: user_id
        })
        const liked = "succes while liking post"
        return liked
        
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