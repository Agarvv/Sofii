const sequelize = require('../config/database');
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
  },
  withFile: {
    type: DataTypes.BOOLEAN,   // Asumí que es un booleano, cambia si es necesario
    allowNull: true
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fileSource: {
    type: DataTypes.TEXT,       // Asumí que esto es un TEXT, cámbialo si necesitas algo más específico
    allowNull: true
  }
}, {
  tableName: 'messages'
});

module.exports = Message;