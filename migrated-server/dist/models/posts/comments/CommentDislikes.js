"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../../config/database"));
const CommentDislikes = database_1.default.define('CommentDislikes', {
    comment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    post_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'comment_dislikes'
});
exports.default = CommentDislikes;
