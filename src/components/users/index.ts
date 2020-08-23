import express from "express";
import { Request, Response } from "express-serve-static-core";
import { body, validationResult } from "express-validator";
import usersController from "./usersController";
import {IResponse, ErrorResponse, Status} from "../../libraries/IResponse";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { CommonErrors } from "../../libraries/commonErrors";

const router = express.Router();


const handleResponse = function(
    response: IResponse,
    res: Response<any>,
    sendBody: boolean
  ) {
    let resp = Object.assign({}, response);
    delete resp.httpCode;
    sendBody
      ? res.status(response.httpCode).send(resp)
      : res.status(response.httpCode).send();
  };

const registrationValidators = [
    body('displayName').notEmpty().trim().escape(),
    body('email').notEmpty().isEmail().normalizeEmail(),
    body('password').notEmpty().isLength({min: 5})
];

router.post('/register', registrationValidators, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return handleResponse(new ErrorResponse(Status.FAIL, CommonErrors.BAD_PARAMETERS, HttpStatusCode.BAD_REQUEST), res, true);

    const { displayName, email, password } = req.body;
    const result = await usersController.saveUser({displayName, email, password});
    handleResponse(result, res, result.data !== undefined)
});

const loginValidators = [
    body('email').notEmpty().isEmail().normalizeEmail(),
    body('password').notEmpty().isLength({min: 5})
];

router.post('/login', loginValidators, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return handleResponse(new ErrorResponse(Status.FAIL, CommonErrors.BAD_PARAMETERS, HttpStatusCode.BAD_REQUEST), res, true);

    const { email, password } = req.body;
    const result = await usersController.login({email, password});
    handleResponse(result, res, result.data !== undefined)
});

export default router