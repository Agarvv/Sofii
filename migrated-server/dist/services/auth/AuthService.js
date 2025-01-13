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
const User_1 = __importDefault(require("../../models/users/User"));
const UserRepository_1 = __importDefault(require("../../repositories/user/UserRepository"));
const CustomError_1 = __importDefault(require("../../outils/CustomError"));
const JwtHelper_1 = __importDefault(require("../../helpers/JwtHelper"));
class AuthService {
    static registerUser(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield UserRepository_1.default.existsByEmail(email)) {
                throw new CustomError_1.default("That email is already taken.", 409);
            }
            const hashedPassword = yield this.hashPassword(password);
            yield User_1.default.create({
                username: username,
                email: email,
                password: hashedPassword
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
            return JwtHelper_1.default.generateToken(jwtPayload);
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
            job: user.job
        };
    }
}
exports.default = AuthService;
