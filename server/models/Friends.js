
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Friends = sequelize.define('Friends', {
    friendship_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    friend_one_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    friend_two_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['friend_one_id', 'friend_two_id']
        }
    ],
    validate: {
        checkFriends() {
            if (this.friend_one_id === this.friend_two_id) {
                throw new Error('Cannot be friends with yourself');
            }
        }
    }
});

module.exports = Friends;