"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.sendResetPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
