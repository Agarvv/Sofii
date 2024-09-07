const Video = require('../models/Video')
const User = require('../models/User')
const VideoComments = require('../models/VideoComments')
const VideoLikes = require('../models/VideoLikes')
const SavedVideo = require('../models/SavedVideo')


const handleVideoCreation = async (user, videoPath, data) => {
    try {
        
        await Video.create({
            video_user_id: user.user_id,
            video_description: data.description,
            video_content: videoPath
        })
        
        const success = "success video creation"
        return success
        
    } catch(e) {
        throw new Error(e)
    }
}

const deleteVideo = async (video, user) => {
    try {
        const deletedVideo = await video.destroy()
        return deletedVideo
    } catch(e) {
        throw e
    }
}

const getVideos = async () => {
    try {
        
     const videos = await Video.findAll({
    where: { video_private: false },
    include: [
        {
            model: User,
            as: 'user_video',  // Usuario que creó el video
            attributes: ['id', 'username', 'email', 'profilePicture']  // Ajusta los atributos según necesites
        },
        {
            model: VideoComments,
            as: 'video_comments',  // Comentarios en el video
            include: [
                {
                    model: User,
                    as: 'video_comment_user',  // Usuario que hizo el comentario
                    attributes: ['id', 'username', 'email']  // Ajusta los atributos según necesites
                }
            ]
        },
        {
            model: VideoLikes,
            as: 'video_likes',  // Likes en el video

        },
        {
            model: SavedVideo,
            as: 'videos_saved'
        }
    ]
});
        return videos;

    } catch (e) {
        throw new Error(e);
    }
};


module.exports = {
    handleVideoCreation,
    getVideos,
    deleteVideo
}