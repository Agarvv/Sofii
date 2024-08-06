const SavedVideo = require('../models/SavedVideo')
const Saved = require('../models/Saved')
const User = require('../models/User')
const Video = require('../models/Video')


const saveVideo = async (user, video_id) => {
  try {
      await SavedVideo.create({
          user_id: user.user_id,
          video_id: video_id
      })
      const success = "video saved sucessfully"
      return success
  } catch(e) {
      throw new Error(e)
  }
}

const savePost = async (user, post_id) => {
    try {
        await Saved.create({
            user_id: user.user_id,
            post_id: post_id
        })
    } catch(e) {
        throw new Error(e)
    }
}

const unsaveVideo = async (user_id, video_id) => {
    try {
        await SavedVideo.destroy({
            where: {
                user_id: user_id,
                video_: video_id
            }
        })
        const unsaved = "video unsaved sucesfully"
        return unsaved 
    } catch(e) {
        throw new Error(e)
    }
}

const unsavePost = async (user_id, post_id) => {
    try {
        await Saved.destroy({
            where: {
                user_id: user_id,
                post_id: post_id
            }
        })
        const unsaved = "post unsaved sucesfully"
        return unsaved 
    } catch(e) {
        throw new Error(e)
    }
}

const handleUserSavedPage = async (user) => {
    try {
        const saved = await SavedVideo.findAll({
            where: { user_id: user.user_id },
            include: [{
                model: Video,
                as: 'videos_saved'
            }]
        });
        return saved;
    } catch (e) {
        throw e; // Simplemente relanza el error capturado
    }
}

module.exports = {
    saveVideo,
    savePost,
    unsaveVideo,
    unsavePost,
    handleUserSavedPage
}