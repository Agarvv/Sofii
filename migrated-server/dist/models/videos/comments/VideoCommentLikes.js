"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../../config/database"));
const VideoCommentLikes = database_1.default.define('VideoCommentLikes', {
    comment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    video_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'video_comment_likes'
});
exports.default = VideoCommentLikes;
