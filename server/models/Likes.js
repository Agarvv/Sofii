const sequelize = require('../config/database')
const { DataTypes } = require('sequelize');

const Likes = sequelize.define('likes', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'likes'
});

module.exports = Likes;