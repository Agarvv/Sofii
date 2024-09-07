const Comment = require('../models/Comment')
const Saved = require('../models/Saved')
const Likes = require('../models/Likes')
const User = require('../models/User')
const Friends = require('../models/Friends')
const Notifications = require('../models/Notifications')
const NotificationService = require('../services/NotificationService')

const tokenController = require('../controllers/tokenController')
const Post = require('../models/Post')
const websocket = require('../websocket')


const createPost = async (post, userId, userDecoded, username, userImg, postImg) => {
        try {
            
           const socialpost = await Post.create({
                  description: post.description,
                  postPicture: postImg,
                  privatePost: post.privatePost,
                  only_friends: post.only_friends,
                  user_id: userId.user_id, 
                  user_name: username,
                  user_img: userImg
           });
           
            if(socialpost) {
                
                const fullPost = await Post.findOne({
    where: {
        id: socialpost.id
    },
    include: [
        {
            model: User,
            as: 'user'
        },
        {
            model: Likes,
            as: 'postLikes'
        },
        {
            model: Saved,
            as: 'saved_post'
        },
        {
            model: Comment,
            as: 'postComments'
        }
    ]
});
               if(fullPost) {
               //THIS IS VERY IMPORTANT FOR LIVE FEED.
               const io = websocket.getIO()
               io.emit('createdPost', fullPost)
                
               } else {
                   throw new Error("The Post Not exist")
               }
               
                const createdPostNotification = await 
                NotificationService.createForFriendNotification(userId)  
                 return fullPost
                
            } else {
                throw new Error("Error while creating Post...")
            }

        } catch(e) {
            console.log(e)
        }
}

const deletePost = async (post, user) => {
    try {
        const deletedPost = await post.destroy()
        return deletedPost
    } catch(e) {
        throw e
    }
}

module.exports = {
    createPost,
    deletePost
}