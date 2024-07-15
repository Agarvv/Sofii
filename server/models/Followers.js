const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
console.log(sequelize)
if(!sequelize) {
    console.log('nor sequelize')
}


const Follower = sequelize.define('followers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  follower_id: {
    type: DataTypes.INTEGER,
    allowNull: false
},
  follower_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  follower_picture: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  following_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  following_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  following_picture: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  }
}, {
  tableName: 'followers'
});

module.exports = Follower;