const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Importa el modelo User

const Video = sequelize.define('Video', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    video_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,  // Usa el modelo directamente
            key: 'id'
        }
    },
    video_private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    video_only_friends: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false
    },
    video_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    video_content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'videos' // Especifica el nombre de la tabla
});

module.exports = Video;