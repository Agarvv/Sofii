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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("@models/users/User"));
const PasswordResetToken_1 = __importDefault(require("@models/users/PasswordResetToken"));
const UserRepository_1 = __importDefault(require("@repositories/user/UserRepository"));
const uuid_1 = require("uuid");
const CustomError_1 = __importDefault(require("@outils/CustomError"));
const JwtHelper_1 = __importDefault(require("@helpers/JwtHelper"));
const MailHelper_1 = __importDefault(require("@helpers/MailHelper"));
class AuthService {
    static registerUser(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield UserRepository_1.default.existsByEmail(email)) {
                throw new CustomError_1.default("That email is already taken.", 409);
            }
            const hashedPassword = yield this.hashPassword(password);
            yield User_1.default.create({
                username,
                email,
                password: hashedPassword,
            });
        });
    }
    static loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.default.findByEmail(email);
            if (!user) {
                throw new CustomError_1.default("That email doesn't exist.", 400);
            }
            yield this.ensurePasswordMatch(password, user.password);
            const jwtPayload = this.generateJwtPayload(user);
            const jwt = JwtHelper_1.default.generateToken(jwtPayload);
            return { userId: user.id, accessToken: jwt };
        });
    }
    static sendResetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield UserRepository_1.default.existsByEmail(email)) {
                const resetToken = this.generateResetToken();
                const expiresAt = new Date();
                expiresAt.setHours(expiresAt.getHours() + 1);
                yield PasswordResetToken_1.default.create({
                    token: resetToken,
                    expires_at: expiresAt,
                    used: false,
                    user_email: email,
                });
                yield this.sendResetEmail(email, resetToken);
            }
        });
    }
    static resetPassword(email, newPassword, resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.default.findByEmail(email);
            if (user) {
                const dbResetToken = yield PasswordResetToken_1.default.findOne({
                    where: {
                        user_email: email,
                        token: resetToken,
                    },
                });
                if (dbResetToken && !this.isResetTokenExpired(dbResetToken)) {
                    user.password = yield this.hashPassword(newPassword);
                    yield user.save();
                    yield dbResetToken.destroy();
                    return;
                }
                throw new CustomError_1.default("Your Reset Password Link Has Expired...", 400);
            }
        });
    }
    static checkAuthentication(jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDecoded = yield JwtHelper_1.default.verifyToken(jwt);
            if (userDecoded)
                return userDecoded.user_id;
            throw new CustomError_1.default("You Aren't Authenticated.", 401);
        });
    }
    static registerBySocialMedia(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const randomPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = yield this.hashPassword(randomPassword);
            const newUser = yield User_1.default.create({
                username: user.username,
                email: user.email,
                password: hashedPassword
            });
            return newUser;
        });
    }
    static authenticateWithSocialMedia(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbUser = yield UserRepository_1.default.findByEmail(user.email);
            if (dbUser) {
                const payload = this.generateJwtPayload(dbUser);
                const jwt = yield JwtHelper_1.default.generateToken(payload);
                return { jwt: jwt, userId: dbUser.id };
            }
            const newUser = yield this.registerBySocialMedia(user);
            const payload = this.generateJwtPayload(newUser);
            const jwt = yield JwtHelper_1.default.generateToken(payload);
            return { jwt: jwt, userId: newUser.id };
        });
    }
    static hashPassword(rawPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.hash(rawPassword, 10);
        });
    }
    static ensurePasswordMatch(original, hashed) {
        return __awaiter(this, void 0, void 0, function* () {
            const isMatch = yield bcryptjs_1.default.compare(original, hashed);
            if (!isMatch) {
                throw new CustomError_1.default("Wrong Password", 400);
            }
        });
    }
    static generateJwtPayload(user) {
        return {
            user_id: user.id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            banner: user.banner,
            bio: user.bio,
            civilStatus: user.civil_status,
            gender: user.gender,
            nativeCity: user.native_city,
            ubication: user.ubication,
            job: user.job,
        };
    }
    static sendResetEmail(email, resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const resetUrl = `https://sofii.vercel.app/reset-password/${email}/${resetToken}`;
            yield MailHelper_1.default.sendMail(email, 'Reset Your Password At Sofii', `Enter this link to reset your password: ${resetUrl}`);
        });
    }
    static generateResetToken() {
        const uuid = (0, uuid_1.v4)();
        let base64Token = Buffer.from(uuid).toString('base64');
        base64Token = base64Token.replace(/\//g, '_').replace(/\+/g, '-').replace(/\?/g, '');
        return base64Token;
    }
    static isResetTokenExpired(resetToken) {
        const now = new Date();
        return resetToken.expires_at <= now;
    }
}
exports.default = AuthService;
