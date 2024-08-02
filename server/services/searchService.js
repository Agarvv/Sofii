const { Op } = require('sequelize');
const User = require('../models/User');
const Post = require('../models/Post');

const handleSearch = async (query) => {
    try {
        
        const errors = []
        
        const usersResults = await User.findAll({
            where: {
                username: {
                    [Op.like]: `%${query}%`
                }
            }
        });
        

        
        const postsResults = await Post.findAll({
            where: {
                description: {
                    [Op.like]: `%${query}%`
                }
            }
        });
          
          if(usersResults.length == 0) {
            errors.push("No Users Found With That Key")
        }
         
        if(postsResults.length == 0) {
            errors.push("No posts found with that key")
        }
         
        
        let results = {
            users: [],
            posts: []
        };

        results.users = results.users.concat(usersResults);
        results.posts = results.posts.concat(postsResults);

         console.log(results);
        
        if(errors.length > 1) {
            return { results, errors }
        } else {
            return { results }
        }
        
        
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

module.exports = {
    handleSearch
};