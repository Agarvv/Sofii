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
const Blocked_1 = __importDefault(require("@models/users/Blocked"));
class BlockRepository {
    static block(blockerId, blockedId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Blocked_1.default.create({
                blocker_id: blockerId,
                blocked_id: blockedId
            });
        });
    }
    static getBlocked(blockedId, blockerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Blocked_1.default.findOne({
                where: {
                    blocked_id: blockedId,
                    blocker_id: blockerId
                }
            });
        });
    }
}
exports.default = BlockRepository;
