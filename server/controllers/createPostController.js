const Post = require('../models/Post')
const createPostService = require('../services/createPostService')


const createPost = async (post, user_id, userDecoded, username, userImg, postImg) => {
        try {
            
               const socialpost = await createPostService.createPost(post, user_id, userDecoded, username, userImg, postImg)
               return socialpost
            
        } catch(e) {
            console.log(e)
       }
}

module.exports = {
    createPost
}