const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Likes = sequelize.define('likes', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Post', // Nombre de la tabla de posts
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Nombre de la tabla de usuarios
      key: 'id'
    }
  }
}, {
  tableName: 'likes'
});

module.exports = Likes;