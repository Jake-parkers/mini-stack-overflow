"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAnswerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.submitAnswerValidator = [
    express_validator_1.body('questionId').notEmpty().trim().escape().isMongoId(),
    express_validator_1.body('excerpt').notEmpty().trim().escape(),
    express_validator_1.body('answer').custom(value => {
        if (!value || value.length === 0)
            return Promise.reject("Invalid Answer Object");
        return true;
    }),
    express_validator_1.body('userId').notEmpty().trim().escape().isMongoId(),
];
//# sourceMappingURL=answersValidator.js.map