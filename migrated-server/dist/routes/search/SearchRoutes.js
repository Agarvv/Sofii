"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SearchController_1 = __importDefault(require("@controllers/search/SearchController"));
const router = (0, express_1.Router)();
router.get('/:query', SearchController_1.default.search);
exports.default = router;
