"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
class GoogleController {
    static authenticate(req, res) {
        passport_1.default.authenticate('google', {
            scope: ['profile', 'email'],
        })(req, res);
    }
    static callback(req, res) {
        passport_1.default.authenticate('google', { failureRedirect: '/' }, (err, user) => {
            if (err) {
                console.log(err);
                return res.redirect('/');
            }
            const email = user === null || user === void 0 ? void 0 : user.email;
            return res.json({ email });
        })(req, res);
    }
}
exports.default = GoogleController;
