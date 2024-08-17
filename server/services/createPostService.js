const Post = require('../models/Post')
const Friends = require('../models/Friends')
const Notifications = require('../models/Notifications')
const NotificationService = require('../services/NotificationService')

const createPost = async (post, userId, userDecoded, username, userImg, postImg) => {
        try {
            console.log('Post image picture xd: ', userId)
           const socialpost = await Post.create({
    description: post.description,
    postPicture: postImg,
    privatePost: post.privatePost,
    only_friends: post.only_friends,
    user_id: userId.user_id, // Asegúrate que userId es realmente el ID, no el objeto completo
    user_name: username,
    user_img: userImg
});
            
            
            
            if(socialpost) {
                const createdPostNotification = await 
                NotificationService.createForFriendNotification(userId)  
                 return socialpost
                
                
                
            } else {
                throw new Error("Error while creating Post...")
            }

            
            
        } catch(e) {
            console.log(e)
        }
}

module.exports = {
    createPost
}