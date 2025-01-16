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
const ProfileService_1 = __importDefault(require("@services/profile/ProfileService"));
class ProfileController {
    static getUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { profileId } = req.params;
            if (profileId == "s") {
                profileId = req.account.user_id;
            } // if the param value "profileId" is equal to "s" that means we have to get our autenthicated current user profile. 
            const profile = yield ProfileService_1.default.getUserProfile(Number(profileId));
            res.status(200).json({
                profile: profile
            });
        });
    }
    static changeProfileData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { field, value } = req.body;
            yield ProfileService_1.default.changeProfileData(field, value, req.account.user_id);
            res.status(200).json({
                message: `Your ${field} Has Been Updated.`
            });
        });
    }
}
exports.default = ProfileController;
