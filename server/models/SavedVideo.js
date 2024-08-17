const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Importa el modelo User
const Video = require('./Video'); // Importa el modelo Video

const SavedVideo = sequelize.define('SavedVideo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,  // Usa el modelo directamente
            key: 'id'
        }
    },
    video_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Video,  // Usa el modelo directamente
            key: 'id'
        }
    }
}, {
    tableName: 'saved_videos' // Especifica el nombre de la tabla
});

module.exports = SavedVideo;