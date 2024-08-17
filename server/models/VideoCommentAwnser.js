const sequelize = require('../config/database')
const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize')

const VideoCommentAwnser = sequelize.define('VideoCommentAwnser', {
    video_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    awnser_content: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = VideoCommentAwnser