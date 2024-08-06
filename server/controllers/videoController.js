const videoService = require('../services/videoService')
const tokenController = require('../controllers/tokenController')
const Video = require('../models/Video')
const User = require('../models/User')
const VideoComments = require('../models/VideoComments')
const VideoLikes = require('../models/VideoLikes')

const handleVideoCreation = async (jwt_token, video, data) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwt_token)
        
        const videoPath = video.path
        console.log('VideoPath: ', videoPath)
        
        
        const success = await videoService.handleVideoCreation(userDecoded, videoPath, data)
        return success
        
        
    } catch(e) {
        throw new Error(e)
    }
}


const findVideoById = async (videoId) => {
    try {
        const video = await Video.findOne({
            where: { id: videoId },
            include: [
                {
                    model: User,
                    as: 'user_video'  // Asegúrate de que este alias coincida con la definición en relations.js
                },
                {
                    model: VideoComments,
                    as: 'video_comments',  // Asegúrate de que este alias coincida con la definición en relations.js
                    include: [
                        {
                            model: User,
                            as: 'video_comment_user'  // Asegúrate de que este alias coincida con la definición en relations.js
                        }
                    ]
                },
                {
                    model: VideoLikes,
                    as: 'video_likes'
                }
            ]
        });
        
        if (!video) {
            throw new Error("We could not find that video, probably it's deleted.");
        }
        
        return video;
    } catch (e) {
        throw e;  // Usa el error capturado directamente
    }
};

module.exports = {
    handleVideoCreation,
    findVideoById
}