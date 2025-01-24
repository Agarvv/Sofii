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
const SavedPost_1 = __importDefault(require("@models/posts/SavedPost"));
const Post_1 = __importDefault(require("@models/posts/Post"));
class SavedRepository {
    static getSaved(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return SavedPost_1.default.findOne({
                where: {
                    user_id: userId,
                    post_id: postId
                }
            });
        });
    }
    static getSaveds(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const saveds = yield SavedPost_1.default.findAll({
                where: {
                    user_id: userId
                },
                include: [{
                        model: Post_1.default,
                        required: true
                    }]
            });
            return saveds.map(saved => saved.post);
        });
    }
}
exports.default = SavedRepository;
