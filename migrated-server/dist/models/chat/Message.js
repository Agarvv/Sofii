"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const Message = database_1.default.define('Message', {
    message_room_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    message_user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    message_content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    message_color: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    withFile: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    fileType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    fileSource: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    readed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    tableName: 'messages'
});
exports.default = Message;
