const postService = require('../services/postService')
const Post = require('../models/Post')

const createComment = async (data, token) => {
    try {
        
        const postExists = await Post.findOne({
    where: { post_id: data.post_id }
});
        if(postExists) {
        await postService.createComment(data, token)
            
        }else {
            throw new Error("We Could Not Find That Post In Our Systems.")
        }
    } catch(e) {
        throw new Error(e)
    }
}