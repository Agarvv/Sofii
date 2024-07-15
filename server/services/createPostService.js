const Post = require('../models/Post')

const createPost = (post, userId, username, userImg) => {
    return new Promise(async(resolve, reject) => {
        try {
            
            await Post.create({
                description: post.description,
                postPicture: post.postPicture,
                privatePost: post.privatePost,
                only_friends: post.only_friends,
                user_id: userId,
                user_name: username,
                user_img: userImg
            })
            
        } catch(e) {
            console.log(e)
        }
    })
}

module.exports = {
    createPost
}