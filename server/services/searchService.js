const { Op } = require('sequelize');
const User = require('../models/User');
const Post = require('../models/Post');
const Video = require('../models/Video')
const Likes = require('../models/Likes')
const VideoLikes = require('../models/VideoLikes')
const Comment = require('../models/Comment')
const VideoComments = require('../models/VideoComments')
const Saved = require('../models/Saved')
const SavedVideo = require('../models/SavedVideo')
const Follower = require('../models/Followers')
const Friends = require('../models/Friends')
const tokenController = require('../controllers/tokenController')


const handleSearch = async (query, jwtToken) => {
    try {
        console.log('Inicio del manejo de búsqueda con query:', query);

        const userDecoded = await tokenController.verifyJwtToken(jwtToken);
        console.log('Usuario decodificado:', userDecoded); 

        const errors = [];

        const usersResults = await User.findAll({
            where: {
                username: {
                    [Op.like]: `%${query}%`
                }
            },
            include: [
                {
                    model: User, // Usar User porque se trata de la misma tabla
                    as: 'followers',
                    through: {
                        model: Follower,
                        as: 'follower'
                    }
                },
                {
                    model: User,
                    as: 'friends',
                    through: {
                        model: Friends,
                        as: 'friends'
                    }
                }
            ]
        });



        const videosResults = await Video.findAll({
            where: {
                video_description: {
                    [Op.like]: `%${query}%`
                },
            },
            include: [
                {
                    model: User,
                    as: 'user_video'
                },
                {
                    model: VideoLikes,
                    as: 'video_likes'
                },
                {
                    model: VideoComments,
                    as: 'video_comments'
                },
                {
                    model: SavedVideo,
                    as: 'videos_saved'
                }
            ]
        });

        console.log('Resultados de videos:', videosResults); // Log de resultados de videos

        const postsResults = await Post.findAll({
            where: {
                description: {
                    [Op.like]: `%${query}%`
                }
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
                    model: Comment,
                    as: 'postComments'
                },
                {
                    model: Saved,
                    as: 'saved_post'
                }
            ]
        });


        if (usersResults.length === 0) {
            errors.push("No Users Found With That Key");
        }

        if (postsResults.length === 0) {
            errors.push("No posts found with that key");
        }

        if (videosResults.length === 0) {
            errors.push('No videos found with that key');
        }


        let results = {
            users: usersResults.map(user => user.toJSON()),
            posts: postsResults.map(post => post.toJSON()),
            videos: videosResults.map(video => video.toJSON())
        };

        console.log('Resultados finales:', results); // Log de resultados finales

        if (errors.length > 0) { // Cambiado a > 0 para detectar cualquier error.
            console.log('Errores encontrados:', errors); // Log de errores
            return { results, errors };
        } else {
            return { results };
        }

    } catch (e) {
        console.log('Error encontrado:', e); // Log de errores
        throw new Error(e);
    }
};

module.exports = {
    handleSearch
};