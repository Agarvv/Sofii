const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notifications = sequelize.define('Notifications', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // User means the user that actioned the notification, example:
    // If a user makes a post, user_id would be equal to the id of the user that maked the post, and user_target is the id of the user friend.
    // Understanding? :p
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    
    // And this is the user that is gonna receive the notification.
    user_target: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // This is the Type of notification,
    // Example:
    // If a user follows a user, then the type for the notification is: 'NEW_FOLLOWER'
    // Why? Because we are making comparatiobs for visual things on the Frontend.
    notification_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // This is the notification content, like: "JIMMY LIKED YOUR POST"
    notification: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // This is the content id of the notification, if you create a post, your friends will have a notification with the type_id of that new post that you just created,
    // Like that we can do a onClick event on the frontend for going to the new post route
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    //I will not explain this one because its so easy to understand, but if you have 45yr Senior Backend Engineer Experience and still not understanding,
    //This is the readed state of the notification, when the user enters in his notification page we will set the notifications that arent with readed false to true, for visual things on the frontend also.
    readed: {
        type: DataTypes.BOOLEAN,
        default: false
    }
}, {
    timestamps: true 
});

module.exports = Notifications;