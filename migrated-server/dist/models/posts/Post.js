"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Post extends sequelize_1.Model {
}
Post.init({
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    postPicture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    private: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    only_friends: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_img: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Post',
    tableName: 'Post',
});
exports.default = Post;
