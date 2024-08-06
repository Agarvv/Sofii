const savedContentService = require('../services/savedContentService')
const tokenController = require('../controllers/tokenController')
const Video = require('../models/Video')
const Post = require('../models/Post')
const SavedVideo = require('../models/SavedVideo')
const Saved = require('../models/Saved')


const saveVideo = async (jwt_token, video_id) => {
    try {
         const userDecoded = await tokenController.verifyJwtToken(jwt_token)
         
         const videoExists = await
         Video.findOne({
             where: { id: video_id }
         })
         
         if(!videoExists) {
             throw new Error("The video that ypu want to save does not exist in our sustem")
         }
         
         
        const isVideoSaved = await SavedVideo.findOne({
            
              where: {
                  
                user_id: userDecoded.user_id,
                 video_id: video_id
                 
               }
               
         });
         
         if(isVideoSaved) {
             const unsaved = await
             savedContentService.unsaveVideo(userDecoded.user_id, video_id)
             return unsaved
         }
         
         
        const saved =  await savedContentService.saveVideo(userDecoded, video_id)
         return saved
         
    } catch(e) {
        throw new Error(e)
    }
}

const savePost = async (token, post_id) => {
    try {
        
        const userDecoded = await
        tokenController.verifyJwtToken(token)
        
        const databasePost = await
        Post.findOne({
            where: { id: post_id }
        })
        
        if(!databasePost) {
            throw new Error("The post that you want to save does not exist")
        }
        
        
        const isPostSaved = 
        await Saved.findOne({
            where: {
                post_id: post_id,
                user_id: userDecoded.user_id
            }
        })
        
        if(isPostSaved) {
            const unsaved = await
            savedContentService.unsavePost(userDecoded.user_id, post_id)
            return unsaved
        }
        
       const saved =  await savedContentService.savePost(userDecoded, post_id)
      
        return saved
        
    } catch(e) {
        throw new Error(e)
    }
}

const handleUserSavedPage = async (jwt_token) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwt_token)
        const saved = await savedContentService.handleUserSavedPage(userDecoded)
        return saved
    } catch(e) {
        throw new Error(e)
    }
}


module.exports = {
    saveVideo,
    handleUserSavedPage,
    savePost
}