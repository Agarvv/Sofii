"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'CustomError';
        this.status = status;
    }
}
exports.default = CustomError;
