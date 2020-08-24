import { query } from "express-validator";

export const searchValidator = [
    query('type').exists().trim().escape(),
    query('query').notEmpty().exists().trim().escape()
]