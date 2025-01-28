"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JwtHelper_1 = __importDefault(require("@helpers/JwtHelper"));
const authMiddleware = (req, res, next) => {
    const jwtToken = req.cookies.jwt;
    if (!jwtToken) {
        res.status(401).json({
            error: "Please log in."
        });
    }
    const result = JwtHelper_1.default.verifyToken(jwtToken);
    if (!result.success) {
        res.status(401).json({
            error: result.message || "Please log in."
        });
    }
    req.account = result.userDecoded;
    next();
};
exports.default = authMiddleware;
