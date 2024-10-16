const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const PasswordResetToken = sequelize.define('PasswordResetToken', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  used: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  user_id: {
      type: DataTypes.INTEGER
  }
})

module.exports = PasswordResetToken
