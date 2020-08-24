"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionValidator = exports.askQuestionValidator = void 0;
const express_validator_1 = require("express-validator");
exports.askQuestionValidator = [
    express_validator_1.body('title').notEmpty().trim().escape(),
    express_validator_1.body('tags').isArray(),
    express_validator_1.body('excerpt').notEmpty().trim().escape(),
    express_validator_1.body('body').custom(value => {
        if (!value || value.length === 0)
            return Promise.reject("Invalid Question Object");
        return true;
    }),
    express_validator_1.body("userId").notEmpty().trim().escape().isMongoId()
];
exports.subscriptionValidator = [
    express_validator_1.body("questionId").notEmpty().trim().escape().isMongoId(),
];
//# sourceMappingURL=questionsValidator.js.map