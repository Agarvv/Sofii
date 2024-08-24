const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');


const VideoCommentAwnsersLikes = sequelize.define('VideoCommentAwnsersLikes', {
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

module.exports = VideoCommentAwnsersLikes