"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const Chat = database_1.default.define('Chat', {
    chat_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sender_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    receiver_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    last_message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: false
});
exports.default = Chat;
