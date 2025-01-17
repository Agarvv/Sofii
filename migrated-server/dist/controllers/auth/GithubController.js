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
const passport_1 = __importDefault(require("passport"));
const AuthService_1 = __importDefault(require("@services/auth/AuthService"));
class GithubController {
    static authenticate(req, res, next) {
        passport_1.default.authenticate('github', {
            scope: ['user:email'],
        })(req, res, next);
    }
    static callback(req, res, next) {
        passport_1.default.authenticate('github', { failureRedirect: '/' }, (err, user) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                return res.redirect('https://sofii.vercel.app');
            }
            if (user) {
                try {
                    const jwt = yield AuthService_1.default.authenticateWithSocialMedia(user);
                    res.cookie('jwt', jwt, {
                        secure: true,
                        httpOnly: true,
                        sameSite: 'none'
                    });
                    return res.status(200).json({
                        accessToken: jwt
                    });
                }
                catch (error) {
                    console.log('Github auth error:', error);
                    return res.redirect('https://sofii.vercel.app');
                }
            }
        }))(req, res, next);
    }
}
exports.default = GithubController;
