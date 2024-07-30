const Comment = require('../models/Comment')
const tokenController = require('../controllers/tokenController')

const createComment = async (data, token) => {
    try {
        const decodedUser = await tokenController.verifyJwtToken(token)
        
        if(!decodedUser) {
            throw new Error("Ops, something Went Down !")
        }
        
        await Comment.create({
            post_id: data.post_id,
            user_id: decodedUser.user_id,
            user_name: decodedUser.username,
            user_profile_picture: decodedUser.profilePicture,
            comment_content: data.comment
        })
        
        return decodedUser
        
    } catch(e) {
     throw new Error(e)
    }
}