const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Tests = sequelize.define('Tests', {
    test_field: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

module.exports = Tests