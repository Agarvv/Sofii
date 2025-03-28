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
class GoogleController {
    static authenticate(req, res, next) {
        passport_1.default.authenticate('google', {
            scope: ['profile', 'email'],
        })(req, res, next);
    }
    static callback(req, res, next) {
        passport_1.default.authenticate('google', { failureRedirect: '/' }, (err, user) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                return res.redirect('https://sofii.vercel.app');
            }
            if (user) {
                try {
                    const { jwt, userId } = yield AuthService_1.default.authenticateWithSocialMedia(user);
                    res.cookie('jwt', jwt, {
                        secure: true,
                        httpOnly: true,
                        sameSite: 'none'
                    });
                    res.redirect(`https://sofii-vsly.vercel.app?userId=${userId}`);
                }
                catch (error) {
                    console.log('Google auth error:', error);
                    return res.redirect('https://sofii.vercel.app');
                }
            }
        }))(req, res, next);
    }
}
exports.default = GoogleController;
