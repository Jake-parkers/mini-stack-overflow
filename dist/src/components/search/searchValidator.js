"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchValidator = void 0;
const express_validator_1 = require("express-validator");
exports.searchValidator = [
    express_validator_1.query('type').exists().trim().escape(),
    express_validator_1.query('query').notEmpty().exists().trim().escape()
];
//# sourceMappingURL=searchValidator.js.map