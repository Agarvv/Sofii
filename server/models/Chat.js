const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Chat = sequelize.define('Chat', {
    chat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    last_message: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

module.exports = Chat