"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("@services/auth/AuthService"));
class AuthController {
    static registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            yield AuthService_1.default.registerUser(username, email, password);
            res.status(201).json({ message: "¡Welcome To Sofii!" });
        });
    }
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const jwtToken = yield AuthService_1.default.loginUser(email, password);
            res.cookie('jwt', jwtToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 3600000 });
            res.status(200).json({ accessToken: jwtToken });
        });
    }
    static sendResetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            yield AuthService_1.default.sendResetPassword(email);
            res.status(200).json({
                "message": "¡Check Your Email!"
            });
        });
    }
    static resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, resetToken } = req.body;
            yield AuthService_1.default.resetPassword(email, password, resetToken);
            res.status(200).json({
                "message": "¡Your Password Is Set!"
            });
        });
    }
    static checkAuthentication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwt = req.cookies.jwt;
            const userId = yield AuthService_1.default.checkAuthentication(jwt);
            res.status(200).json({
                userId: userId
            });
        });
    }
}
exports.default = AuthController;
