const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const CommentLikes = sequelize.define('CommentLikes', {
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = CommentLikes