import express, { NextFunction } from "express";
import { validationResult } from "express-validator";
import { handleResponse } from "../index";
import {ErrorResponse, Status} from "../../libraries/IResponse";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { CommonErrors } from "../../libraries/commonErrors";
import { Request, Response } from "express-serve-static-core";
import questionsController from "./questionsController";
import { askQuestionValidator } from "./questionsValidator";
const router = express.Router();




router.post('/ask', askQuestionValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return handleResponse(new ErrorResponse(Status.FAIL, CommonErrors.BAD_PARAMETERS, HttpStatusCode.BAD_REQUEST), res);

    const { title, body, tags, userId, excerpt } = req.body;

    const result = await questionsController.ask({title, body, tags, askedBy: userId, excerpt});
    handleResponse(result, res);
});

const checkPaginationParams = (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.page){
        // @ts-ignore
        req.query.page = Number(process.env.DEFAULT_PAGE);
    } 
    if (!req.query.limit) {
        // @ts-ignore
        req.query.limit = Number(process.env.DEFAULT_LIMIT);
    }
    next();
}

router.get('/', checkPaginationParams, async (req: Request, res: Response) => {
    const { page, limit } = req.query;

    const result = await questionsController.view(Number(page), Number(limit));
    handleResponse(result, res);
})

export default router;