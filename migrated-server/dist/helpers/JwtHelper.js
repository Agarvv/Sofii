"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtHelper {
    static generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.SECRET, { expiresIn: this.EXPIRATION });
    }
    static verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.SECRET);
        }
        catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}
JwtHelper.SECRET = process.env.JWT_SECRET || '!+()@3*+25#34+€(€(#!)#82+!"9#(;_*';
JwtHelper.EXPIRATION = '1h';
exports.default = JwtHelper;
