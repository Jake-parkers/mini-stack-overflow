import express from "express";
import { Request, Response } from "express-serve-static-core";
import { submitAnswerValidator } from "./answersValidator";
import { validationResult } from "express-validator";
import { handleResponse } from "..";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { CommonErrors } from "../../libraries/commonErrors";
import { ErrorResponse, Status } from "../../libraries/IResponse";
import answersController from "./answersController";

const router = express.Router();

router.post('/submit', submitAnswerValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return handleResponse(new ErrorResponse(Status.FAIL, CommonErrors.BAD_PARAMETERS, HttpStatusCode.BAD_REQUEST), res);

    const { questionId, answer, userId, excerpt } = req.body;

    const result = await answersController.submitAnswer({questionId, body: answer, userId, excerpt});
    handleResponse(result, res);
});

router.post

export default router;