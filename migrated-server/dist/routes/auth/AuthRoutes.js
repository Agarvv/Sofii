"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ValidationMiddleware_1 = require("@middleware/ValidationMiddleware");
const RegisterSchema_1 = require("@validation/auth/RegisterSchema");
const LoginSchema_1 = require("@validation/auth/LoginSchema");
const SendResetPasswordSchema_1 = require("@validation/auth/SendResetPasswordSchema");
const ResetPasswordSchema_1 = require("@validation/auth/ResetPasswordSchema");
const AuthController_1 = __importDefault(require("@controllers/auth/AuthController"));
const authRouter = express_1.default.Router();
authRouter.post('/register', (0, ValidationMiddleware_1.validateRequest)(RegisterSchema_1.registerSchema), AuthController_1.default.registerUser);
authRouter.post('/login', (0, ValidationMiddleware_1.validateRequest)(LoginSchema_1.loginSchema), AuthController_1.default.loginUser);
authRouter.post('/send-reset-password', (0, ValidationMiddleware_1.validateRequest)(SendResetPasswordSchema_1.sendResetPasswordSchema), AuthController_1.default.sendResetPassword);
authRouter.post('/reset-password', (0, ValidationMiddleware_1.validateRequest)(ResetPasswordSchema_1.resetPasswordSchema), AuthController_1.default.resetPassword);
exports.default = authRouter;
