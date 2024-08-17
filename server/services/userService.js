const User = require('../models/User')
const tokenController = require('../controllers/tokenController')
const Post = require('../models/Post')
const FriendRequest = require('../models/FriendRequest')
const Comment = require('../models/Comment')
const Likes = require('../models/Likes')

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
                    }
                   ]
                },
                {
                    model: FriendRequest,
                    as: 'sentRequests',
                    attributes: ['id', 'friend_target'] // Incluye los atributos relevantes
                },
                {
                    model: FriendRequest,
                    as: 'receivedRequests',
                    attributes: ['id', 'request_sender_id'] // Incluye los atributos relevantes
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

module.exports = {
    handleProfileDataChange,
    findUserById
};


module.exports = {
	handleProfileDataChange,
	findUserById
}
