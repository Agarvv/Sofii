const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notifications = sequelize.define('Notifications', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    user_target: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    notification_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notification: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true // Añade automáticamente los campos createdAt y updatedAt
});

module.exports = Notifications;