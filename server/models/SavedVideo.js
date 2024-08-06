const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SavedVideo = sequelize.define('SavedVideo', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    video_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Post',
            key: 'id'
        }
    }
})

module.exports = SavedVideo