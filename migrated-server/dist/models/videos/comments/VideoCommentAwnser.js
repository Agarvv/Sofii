"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../../config/database"));
const VideoCommentAwnser = database_1.default.define('VideoCommentAwnser', {
    video_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    comment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    awnser_content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'video_comment_awnser'
});
exports.default = VideoCommentAwnser;
