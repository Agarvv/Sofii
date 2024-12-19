"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Follower extends sequelize_1.Model {
}
Follower.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    follower_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    follower_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    follower_picture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        },
    },
    following_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    following_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    following_picture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        },
    },
}, {
    sequelize: database_1.default,
    tableName: 'followers',
    modelName: 'Follower',
});
exports.default = Follower;
