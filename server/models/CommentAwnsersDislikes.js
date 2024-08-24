const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');


const CommentAwnsersDislikes = sequelize.define('CommentAwnsersDislikes', {
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

module.exports = CommentAwnsersDislikes
