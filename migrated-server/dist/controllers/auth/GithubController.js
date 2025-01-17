"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
class GithubController {
    static authenticate(req, res, next) {
        passport_1.default.authenticate('github', {
            scope: ['user:email'],
        })(req, res, next);
    }
    static callback(req, res, next) {
        passport_1.default.authenticate('github', { failureRedirect: '/' }, (err, user) => {
            if (err) {
                return res.redirect('/');
            }
            const email = user === null || user === void 0 ? void 0 : user.email;
            return res.json({ email });
        })(req, res, next);
    }
}
exports.default = GithubController;
