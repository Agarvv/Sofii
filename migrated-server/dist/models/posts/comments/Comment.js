"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../../config/database"));
const Comment = database_1.default.define('Comment', {
    post_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    user_profile_picture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    comment_content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
    }
}, {
    tableName: 'comment'
});
exports.default = Comment;
