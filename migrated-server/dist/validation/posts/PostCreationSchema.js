"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCreationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.postCreationSchema = joi_1.default.object({
    description: joi_1.default.string().required(),
    picture: joi_1.default.string().required()
});
