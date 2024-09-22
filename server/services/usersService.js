const User = require('../models/User')
const Follower = require('./Followers');
const FriendRequest = require('./FriendRequest')
const Friends = require('./Friends');  

const findUserById = (id) => {
    try {
        const databaseUser = User.findOne(
            {
                where: 
                {
                    id: id
                },
                include: [
                    {
                        model: User,
                        through: Follower,
                        as: 'followers'
                    },
                    {
                        model: User,
                        through: Friends,
                        as: 'friends'
                    },
                    {
                        model: FriendRequest,
                        as: 'sentRequests'
                    },
                    {
                        model: FriendRequest,
                        as: 'receivedRequests'
                    }
                ]
            }
        )
        if(!databaseUser) {
            throw new Error("User Not Found (404)")
        }
        return databaseUser
    } catch(e) {
        console.log(e)
        throw new Error("Ooops, Something Went Down Here !", e)
    }
}

module.exports = {
    findUserById
}