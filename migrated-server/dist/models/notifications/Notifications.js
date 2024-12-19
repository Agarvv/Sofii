"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const Notifications = database_1.default.define('Notifications', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    user_target: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    notification_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    notification: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    type_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    readed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});
exports.default = Notifications;
