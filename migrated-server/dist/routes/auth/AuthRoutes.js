"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
authRouter.post('/register', (req, res) => {
    res.status(501).send("Not implemented.");
});
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
