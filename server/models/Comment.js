const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PostComment = sequelize.define('comment', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_profile_picture: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  comment_content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  tableName: 'comment'
});

module.exports = PostComment;