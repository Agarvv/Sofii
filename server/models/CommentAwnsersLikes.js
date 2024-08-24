const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');


const CommentAwnsersLikes = sequelize.define('CommentAwnsersLikes', {
    awnser_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
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

module.exports = CommentAwnsersLikes
