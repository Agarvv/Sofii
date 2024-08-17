const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('comment', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'users',
        key: 'id'
    }
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  user_profile_picture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  comment_content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true
  }
}, {
  tableName: 'comment'
});

module.exports = Comment;