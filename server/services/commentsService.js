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
            user_profile_picture: decodedUser.user_picture,
            comment_content: data.comment
        })
        
        return decodedUser
        
    } catch(e) {
     throw new Error(e)
    }
}

const findCommentByPostId = async (post_id) => {
    try {
        const comments = 
        await Comment.findAll({ where: { post_id: post_id} })
        if(!comments) {
            return res.status(500).json({detail: 'No comments found for that post...'})
        }
        return comments
    } catch(e) {
        console.log(e)
        throw new Error(e)
    }
}

module.exports = {
    createComment,
    findCommentByPostId
}