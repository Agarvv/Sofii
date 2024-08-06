const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VideoComments = sequelize.define('VideoComments', {
    video_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment_content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = VideoComments