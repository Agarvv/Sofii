"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    done(null, { id, username: '', email: '', profilePicture: '' });
});
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://sofii-vsly.onrender.com/api/sofii/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    const user = {
        id: profile.id,
        username: profile.displayName,
        email: profile.emails ? profile.emails[0].value : '',
        profilePicture: profile.photos ? profile.photos[0].value : '',
    };
    return done(null, user);
}));
