import { body } from "express-validator";

export const submitAnswerValidator = [
    body('questionId').notEmpty().trim().escape().isMongoId(),
    body('excerpt').notEmpty().trim().escape(),
    body('answer').custom(value => {
        if (!value || Object.keys(value).length === 0) return Promise.reject("Invalid Answer Object")
        return true;
    }),
    body('userId').notEmpty().trim().escape().isMongoId(),
]