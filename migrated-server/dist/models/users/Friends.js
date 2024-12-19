"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const User_1 = __importDefault(require("./User"));
class Friends extends sequelize_1.Model {
    checkFriends() {
        if (this.friend_one_id === this.friend_two_id) {
            throw new Error('Cannot be friends with yourself');
        }
    }
}
Friends.init({
    friendship_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    friend_one_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: User_1.default,
            key: 'id',
        },
        allowNull: false,
    },
    friend_two_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: User_1.default,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Friends',
    indexes: [
        {
            unique: true,
            fields: ['friend_one_id', 'friend_two_id'],
        },
    ],
    validate: {
        checkFriends() {
            if (this.friend_one_id === this.friend_two_id) {
                throw new Error('Cannot be friends with yourself');
            }
        },
    },
});
exports.default = Friends;
