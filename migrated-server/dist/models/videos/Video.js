"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("@config/database"));
const Video = database_1.default.define('Video', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    video_user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    video_private: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    video_only_friends: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    video_description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    video_content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'videos'
});
exports.default = Video;
