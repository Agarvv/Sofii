const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');


const VideoCommentDislikes = sequelize.define('VideoCommentDislikes', {
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    video_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = VideoCommentDislikes