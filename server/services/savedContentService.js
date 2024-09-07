const SavedVideo = require('../models/SavedVideo')
const Saved = require('../models/Saved')
const User = require('../models/User')
const Video = require('../models/Video')
const Post = require('../models/Post')
const Likes = require('../models/Likes')
const VideoLikes = require('../models/VideoLikes')
const Comment = require('../models/Comment')
const VideoComments = require('../models/VideoComments')
const websocket = require('../websocket')


const saveVideo = async (user, video_id) => {
  try {
      
      const saved = await SavedVideo.create({
          user_id: user.user_id,
          video_id: video_id
      })
      
      const io = websocket.getIO()
      io.emit('savedVideo', saved)
      
      return { saved: true, unsaved: false }
      
  } catch(e) {
      throw new Error(e)
  }
}

const savePost = async (user, post_id) => {
    try {
        const saved = await Saved.create({
            user_id: user.user_id,
            post_id: post_id
        })
        
        const io = websocket.getIO()
        io.emit('savedPost', saved)
        
        return { saved: true, unsaved: false }
        
    } catch(e) {
        throw new Error(e)
    }
}

const unsaveVideo = async (user_id, saved) => {
    try {
        await saved.destroy()
        
        const io = websocket.getIO()
        io.emit('unsavedVideo', saved)
        
        return { saved: false, unsaved: true }
        
    } catch(e) {
        throw new Error(e)
    }
}

const unsavePost = async (user_id, saved) => {
    try {
        
       await saved.destroy()
       const io = websocket.getIO()
       io.emit('unsavedPost', saved)
       
       return { saved: false, unsaved: true }
       
    } catch(e) {
        throw new Error(e)
    }
}

const handleUserSavedPage = async (user) => {
    try {
        // Obtener los videos guardados
        const savedVideos = await SavedVideo.findAll({
            where: { user_id: user.user_id },
            include: [
                {
                    model: Video,
                    as: 'saved_video_video',
                    include: [
                        {
                            model: User,
                            as: 'user_video'
                        },
                        {
                            model: VideoLikes,
                            as: 'video_likes'
                        },
                        {
                            model: VideoComments,
                            as: 'video_comments'
                        },
                        {
                            model: SavedVideo,
                            as: 'videos_saved'
                        }
                    ]
                }
            ]
        });

        // Obtener las publicaciones guardadas
        const savedPosts = await Saved.findAll({
            where: { user_id: user.user_id },
            include: [
                {
                    model: Post,
                    as: 'saved_post',
                    include: [
                        {
                            model: User,
                            as: 'user'
                        },
                        {
                            model: Comment,
                            as: 'postComments'
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
                }
            ]
        });

        // Combinar y retornar los datos
        const saved = { savedPosts, savedVideos };
        return saved;
    } catch (e) {
        throw e; // Simplemente relanza el error capturado
    }
};

module.exports = {
    saveVideo,
    savePost,
    unsaveVideo,
    unsavePost,
    handleUserSavedPage
}