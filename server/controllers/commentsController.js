const commentsService = require('../services/commentsService')
const Post = require('../models/Post')

const createComment = async (data, token) => {
    try {
        
        const postExists = await Post.findOne({
    where: { id: data.post_id }
});
        if(postExists) {
        await commentsService.createComment(data, token)
            
        }else {
            throw new Error("We Could Not Find That Post In Our Systems.")
        }
    } catch(e) {
        throw new Error(e)
    }
}

const findCommentByPostId = async (post_id) => {
    try {
        const databasePost = await Post.findOne({
            where: { id: post_id }  // Corregir aquí
        });
        if(!databasePost) {
            throw new Error("That Post Does Not Exist In Our Systems")
        }
       const comments = await commentsService.findCommentByPostId(post_id)
       
       if(!comments) {
           throw new Error("Something Went Wrong !")
       }
       
       if(comments.length == 0) {
           throw new Error("This Post Does Not Have Comments Yet, Post One !")
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

