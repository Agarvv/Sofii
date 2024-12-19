"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Likes extends sequelize_1.Model {
}
Likes.init({
    post_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Post',
            key: 'id',
        },
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    sequelize: '@config/database',
    modelName: 'Likes',
    tableName: 'likes',
});
exports.default = Likes;
