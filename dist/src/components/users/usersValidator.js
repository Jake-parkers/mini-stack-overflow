"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationValidator = exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidator = [
    express_validator_1.body('email').notEmpty().isEmail().normalizeEmail(),
    express_validator_1.body('password').notEmpty().isLength({ min: 5 })
];
exports.registrationValidator = [
    express_validator_1.body('displayName').notEmpty().trim().escape(),
    express_validator_1.body('email').notEmpty().isEmail().normalizeEmail(),
    express_validator_1.body('password').notEmpty().isLength({ min: 5 })
];
//# sourceMappingURL=usersValidator.js.map