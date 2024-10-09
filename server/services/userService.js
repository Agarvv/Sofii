const User = require('../models/User')
const tokenController = require('../controllers/tokenController')
const Post = require('../models/Post')
const FriendRequest = require('../models/FriendRequest')
const Comment = require('../models/Comment')
const Likes = require('../models/Likes')
const Follower = require('../models/Followers')
const { Op } = require('sequelize');
const Saved = require('../models/Saved')
const Friends = require('../models/Friends')
const Blocked = require('../models/Blocked')



const handleProfileDataChange = async (field, value, token) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(token)
        
        if(!userDecoded) {
            throw new Error("Something went wrong with your session.")
        }
        
        // Corregido: Uso de where para buscar por ID
        const user = await User.findOne({ where: { id: userDecoded.user_id } })
        
        if(!user){
            throw new Error("User not found.")
        }
         console.log('service value', value)
        
        user[field] = value
        console.log('Profile Picture Before Save:', user.profilePicture)
        
        await user.save()
        console.log('Profile Picture After Save:', user.profilePicture)
        
        return user
        
    } catch(e) {
        console.error('Error handling profile data change:', e)
        throw new Error(e)
    }
}

const findUserById = async (user_id) => {
    try {
        const databaseUser = await User.findOne({
            where: { id: user_id },
            include: [
                {
                    model: Post,
                    as: 'posts',
                    include: [
                        {
                            model: User,
                            as: 'user'
                        },
                        {
                            model: Comment,
                            as: 'postComments'
                        },
                        {
                            model: Likes,
                            as: 'postLikes'
                        },
                        {
                            model: Saved,
                            as: 'saved_post'
                        }
                    ]
                },
                {
                    model: FriendRequest,
                    as: 'sentRequests'
                },
                {
                    model: FriendRequest,
                    as: 'receivedRequests'
                },
                {
                    model: User,
                    as: 'followers'  // Cambiamos aquí el alias a 'followers'
                },
                {
                    model: User,
                    as: 'following'  // Y aquí a 'following'
                },
                {
                    model: Friends,  // Aquí debe ser Friends, no User
                    as: 'friends',
                    where: {
                        [Op.or]: [  // Asegúrate de que los corchetes y dos puntos estén en su lugar
                            { friend_one_id: user_id },
                            { friend_two_id: user_id }
                        ]
                    },
                    include: [  // Asegúrate de incluir la información de los amigos
                        {
                            model: User,
                            as: 'friendOne', // Aquí puedes poner los alias que quieras
                            attributes: ['id', 'name'] // Atributos que quieras de friendOne
                        },
                        {
                            model: User,
                            as: 'friendTwo',
                            attributes: ['id', 'name'] // Atributos que quieras de friendTwo
                        }
                    ]
                },
                {
                    model: Blocked,
                    as: 'users_blocked_me'
                }
            ]
        });

        if (!databaseUser) {
            throw new Error("We could not find that user");
        }

        return databaseUser;

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

const blockUser = async (target, user) => {
    try {
        await Blocked.create({
            blocked_id: target.id,
            blocker_id: user.user_id
        })
        
        return true 
        
    } catch(e) {
        throw e
    }
}


const unblockUser = async (block) => {
    try {
        //just destroys the block object from the database
        await block.destroy()
        return true 
    } catch(e) {
        throw e
    }
}



module.exports = {
	handleProfileDataChange,
	findUserById,
	blockUser,
	unblockUser
}
