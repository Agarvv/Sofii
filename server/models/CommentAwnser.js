const sequelize = require('../config/database')
const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize')

const CommentAnswer = Sequelize.define('comment_awnsers', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  answer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
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
  answer_content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  tableName: 'comment_answers'
});

module.exports = CommentAnswer;