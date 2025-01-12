"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ValidationMiddleware_1 = require("../../middleware/ValidationMiddleware");
const RegisterSchema_1 = require("../../validation/auth/RegisterSchema");
const AuthController_1 = __importDefault(require("../../controllers/auth/AuthController"));
const authRouter = express_1.default.Router();
authRouter.post('/register', (0, ValidationMiddleware_1.validateRequest)(RegisterSchema_1.registerSchema), AuthController_1.default.RegisterUser);
authRouter.post('/login', (req, res) => {
    res.status(501).send("Not implemented.");
});
authRouter.post('/send-reset-password', (req, res) => {
    res.status(501).send("Not implemented.");
});
authRouter.post('/reset-password', (req, res) => {
    res.status(501).send("Not implemented.");
});
exports.default = authRouter;
