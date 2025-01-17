"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JwtHelper_1 = __importDefault(require("@helpers/JwtHelper"));
const authMiddleware = (req, res, next) => {
    const jwtToken = req.cookies.jwt;
    if (!jwtToken) {
        return next(new Error("No JWT Found."));
        console.log("no jwt");
    }
    try {
        const decoded = JwtHelper_1.default.verifyToken(jwtToken);
        console.log(decoded);
        req.account = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        return next(new Error("Invalid or expired token."));
    }
};
exports.default = authMiddleware;
