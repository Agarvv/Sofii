"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.resetPasswordSchema = joi_1.default.object({
    password: joi_1.default.string().min(6).max(40).required(),
    email: joi_1.default.string().email().required(),
    resetToken: joi_1.default.string().required(),
});
