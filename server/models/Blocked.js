const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Blocked = sequelize.define('Blocked', {
    //The user who is blocked
    blocked_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // the user who BLOCKED 
    blocker_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Blocked