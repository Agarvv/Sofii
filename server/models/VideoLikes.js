const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const VideoLikes = sequelize.define('VideoLikes', {
    video_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = VideoLikes