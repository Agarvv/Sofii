const commentsService = require('../services/commentsService')
const Post = require('../models/Post')
const Video = require('../models/Video')
const tokenController = require('../controllers/tokenController')
const Comment = require('../models/Comment')
const VideoComments = require('../models/VideoComments')

const createComment = async (data, token) => {
    try {
        console.log('data   jdje', data)
        const userDecoded = await tokenController.verifyJwtToken(token);

        let resource;
        if (data.type === "POST") {
            resource = await Post.findOne({ where: { id: data.post_id } });
        } else if (data.type === "VIDEO") {
            resource = await Video.findOne({ where: { id: data.video_id } });
        }

        if (!resource) {
            throw new Error(`${data.type} not found`);
        }

        const comment = await commentsService.createComment(data.type, resource, userDecoded, data.comment);
        return comment;

    } catch (e) {
        throw e; // Simplemente re-lanzamos el error, sin envolverlo en otro
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

const awnserToPostComment = async (jwtToken, post_id, comment_id, awnser_content) => {
    try {
        const userDecoded = await 
        tokenController.verifyJwtToken(jwtToken)
        
        
        
        
        const postExists = await
        Post.findOne({
            where: {
                id: post_id 
            }
        })
        
        const commentExists = await
        Comment.findOne({
            where: {
                id: comment_id 
            }
        })
        
        if(!postExists) {
            throw new Error("post_not_exists")
        }
        
        if(!commentExists) {
            throw new Error("comment_not_exists")
        }
        
        await commentsService.awnserToPostComment(userDecoded,post_id, commentExists, awnser_content)
        return 
    
    } catch(e) {
        throw new Error(e)
    }
}

const awnserToVideoComment = async (jwtToken, video_id, comment_id, awnser_content) => {
    try {
        const userDecoded = await 
        tokenController.verifyJwtToken(jwtToken)
        
        
        
        
        const videoExists = await
        Video.findOne({
            where: {
                id: video_id 
            }
        })
        
        const commentExists = await
        VideoComments.findOne({
            where: {
                id: comment_id 
            }
        })
        
        if(!videoExists) {
            throw new Error("post_not_exists")
        }
        
        if(!commentExists) {
            throw new Error("comment_not_exists")
        }
        
        await commentsService.awnserToVideoComment(userDecoded,video_id, commentExists, awnser_content)
        return 
    
    } catch(e) {
        throw new Error(e)
    }
}

module.exports = {
    createComment,
    findCommentByPostId,
    awnserToPostComment,
    awnserToVideoComment
}

