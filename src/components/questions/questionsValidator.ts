import { body, query } from "express-validator";

export const askQuestionValidator = [
    body('title').notEmpty().trim().escape(),
    body('tags').isArray(),
    body('body').custom(value => {
        if (!value || Object.keys(value).length === 0) return Promise.reject("Invalid Question Object")
        return true;
    }),
    body("userId").notEmpty().trim().escape().isMongoId()
]