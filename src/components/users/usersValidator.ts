import { body } from "express-validator";

export const loginValidator = [
    body('email').notEmpty().isEmail().normalizeEmail(),
    body('password').notEmpty().isLength({min: 5})
];

export const registrationValidator = [
    body('displayName').notEmpty().trim().escape(),
    body('email').notEmpty().isEmail().normalizeEmail(),
    body('password').notEmpty().isLength({min: 5})
];