"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProfileController_1 = __importDefault(require("@controllers/profile/ProfileController"));
const profileRouter = express_1.default.Router();
profileRouter.get('/:profileId', ProfileController_1.default.getUserProfile);
profileRouter.post('/set', ProfileController_1.default.changeProfileData);
exports.default = profileRouter;
