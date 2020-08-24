import express from "express";
import { body, validationResult } from "express-validator";
import { handleResponse } from "../index";
import {ErrorResponse, Status} from "../../libraries/IResponse";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { CommonErrors } from "../../libraries/commonErrors";
import { Request, Response } from "express-serve-static-core";
import questionsController from "./questionsController";

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Questions Route");
});

const askQuestionValidator = [
    body('title').notEmpty().trim().escape(),
    body('tags').isArray(),
    body("userId").notEmpty().trim().escape().isMongoId()
]

router.post('/ask', askQuestionValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return handleResponse(new ErrorResponse(Status.FAIL, CommonErrors.BAD_PARAMETERS, HttpStatusCode.BAD_REQUEST), res);

    const { title, body, tags, userId } = req.body;

    const result = await questionsController.ask({title, body, tags, askedBy: userId});
    handleResponse(result, res);
})

export default router;