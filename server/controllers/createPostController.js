const Post = require('../models/Post')
const createPostService = require('../services/createPostService')


const createPost = (post, user_id, username, userImg) => {
    return new Promise(async(resolve, reject) => {
        try {
            
          
                await createPostService.createPost(post, user_id, username, userImg)
        
            
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createPost
}