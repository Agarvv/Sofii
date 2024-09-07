const videoService = require('../services/videoService')
const tokenController = require('../controllers/tokenController')
const Video = require('../models/Video')
const User = require('../models/User')
const VideoComments = require('../models/VideoComments')
const VideoCommentAwnser = require('../models/VideoCommentAwnser')
const VideoLikes = require('../models/VideoLikes')


const SavedVideo = require('../models/SavedVideo')
const VideoCommentLikes = require('../models/VideoCommentLikes')
const VideoCommentDislikes = require('../models/VideoCommentDislikes')
const VideoCommentAwnsersLikes = require('../models/VideoCommentAwnsersLikes')
const VideoCommentAwnsersDislikes = require('../models/VideoCommentAwnsersDislikes')




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

const deleteVideo = async (video_id, jwtToken) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwtToken)
        
        const videoExists = await Video.findOne({
            where: {
                id: video_id,
                video_user_id: userDecoded.user_id
            }
        })
        
        if(videoExists) {
            const deletedVideo = await videoService.deleteVideo(videoExists, userDecoded)
            return deletedVideo
        } else {
            throw new Error("Something Is Wrong With The Video That You Want To Delete, Maybe Its Deleted Or Is Not Yours.")
        }
    } catch(e) {
        throw e
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
                        },
                        {
                            model: VideoCommentLikes,
                            as: 'comment_likes'
                        },
                        {
                            model: VideoCommentDislikes,
                            as: 'comment_dislikes'
                        }, 
                        {
                            model: VideoCommentAwnser,
                            as: 'awnsers',
                            include: [
                            
                            {
                                model: User,
                                as: 'comment_awnser_user'
                            },
                            {
                                model: VideoCommentAwnsersLikes,
                                as: 'awnser_likes'
                            },
                            {
                                model: VideoCommentAwnsersDislikes,
                                as: 'awnser_dislikes'
                            }
                            
                            ]
                        }
                    ]
                },
                {
                    model: VideoLikes,
                    as: 'video_likes'
                },
                {
                    model: SavedVideo,
                    as: 'videos_saved'
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
    findVideoById,
    deleteVideo
}