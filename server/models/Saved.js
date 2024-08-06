const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Saved = sequelize.define('Saved', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Saved