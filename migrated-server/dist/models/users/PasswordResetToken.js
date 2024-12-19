"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class PasswordResetToken extends sequelize_1.Model {
}
PasswordResetToken.init({
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    expires_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    used: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    sequelize: database_1.default,
    modelName: 'PasswordResetToken',
});
exports.default = PasswordResetToken;
