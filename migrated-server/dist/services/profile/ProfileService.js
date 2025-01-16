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
const ProfileRepository_1 = __importDefault(require("@repositories/profile/ProfileRepository"));
const User_1 = __importDefault(require("@models/users/User"));
class ProfileService {
    static getUserProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield ProfileRepository_1.default.getUserProfile(userId);
            return profile;
        });
    }
    static changeProfileData(field, value, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByPk(userId);
            if (user) {
                user[field] = value;
                yield user.save();
            }
        });
    }
    static setUserStatus(status, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByPk(userId);
            if (user) {
                user.active = status == 'online';
                yield user.save();
            }
        });
    }
}
exports.default = ProfileService;
