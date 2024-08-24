const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const CommentDislikes = sequelize.define('CommentDislikes', {
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

module.exports = CommentDislikes