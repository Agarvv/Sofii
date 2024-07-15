const Post = require('../models/Post')

const createPost = async (post, userId, username, userImg, postImg) => {
        try {
            console.log('Post image picture xd: ', postImg)
           const socialpost = await Post.create({
                description: post.description,
                postPicture: postImg,
                privatePost: post.privatePost,
                only_friends: post.only_friends,
                user_id: userId,
                user_name: username,
                user_img: userImg
            })

            return socialpost
            
        } catch(e) {
            console.log(e)
        }
}

module.exports = {
    createPost
}