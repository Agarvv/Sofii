const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const VideoCommentAwnsersDislikes = sequelize.define('VideoCommentAwnsersDislikes', {
    awnser_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
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

module.exports = VideoCommentAwnsersDislikes