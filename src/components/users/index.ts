import express from "express";
import { Request, Response } from "express-serve-static-core";
import { body, validationResult } from "express-validator";
import usersController from "./usersController";
import {ErrorResponse, Status} from "../../libraries/IResponse";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { CommonErrors } from "../../libraries/commonErrors";
import { handleResponse } from "../index";

const router = express.Router();


const registrationValidators = [
    body('displayName').notEmpty().trim().escape(),
    body('email').notEmpty().isEmail().normalizeEmail(),
    body('password').notEmpty().isLength({min: 5})
];

router.post('/register', registrationValidators, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return handleResponse(new ErrorResponse(Status.FAIL, CommonErrors.BAD_PARAMETERS, HttpStatusCode.BAD_REQUEST), res);

    const { displayName, email, password } = req.body;
    const result = await usersController.saveUser({displayName, email, password});
    handleResponse(result, res)
});

const loginValidators = [
    body('email').notEmpty().isEmail().normalizeEmail(),
    body('password').notEmpty().isLength({min: 5})
];

router.post('/login', loginValidators, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return handleResponse(new ErrorResponse(Status.FAIL, CommonErrors.BAD_PARAMETERS, HttpStatusCode.BAD_REQUEST), res);

    const { email, password } = req.body;
    const result = await usersController.login({email, password});
    handleResponse(result, res)
});

export default router