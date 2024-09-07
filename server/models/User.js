const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 25]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 100]
    }
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM,
    values: ['male', 'female', 'non-binary', 'other'],
    allowNull: true
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDate: true
    }
  },
  private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  only_friends: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isDate: true
    }
  },
  ubication: {
    type: DataTypes.STRING,
    allowNull: true
  },
  native_city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  civil_status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  banned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tag: {
      type: DataTypes.STRING,
      allowNull: true
  },
  job: {
      type: DataTypes.STRING,
      allowNull: true
  },
  banner: {
      type: DataTypes.STRING,
      allowNull: true
  },
  active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
  }
}, {
  tableName: 'users'
});

module.exports = User;