const sequelize = require('../config/database')
const { DataTypes } = require('sequelize');


const Post = sequelize.define('Post', {
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  postPicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  only_friends: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_img: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Post'
});

module.exports = Post;