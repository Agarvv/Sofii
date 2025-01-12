"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (validator) => {
    return (req, res, next) => {
        const { error } = validator.validate(req.body);
        if (error) {
            res.status(400).json({ errors: error.details });
            return;
        }
        next();
    };
};
exports.validateRequest = validateRequest;
