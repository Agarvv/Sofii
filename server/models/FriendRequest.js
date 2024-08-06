const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FriendRequest = sequelize.define('FriendRequest', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    friend_target: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    request_sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = FriendRequest