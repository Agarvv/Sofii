const sequelize = require('../config/database')
const { DataTypes } = require('sequelize');

const Message = sequelize.define('messages', {
  message_room_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  message_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  message_content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  message_color: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'messages'
});

module.exports = Message;