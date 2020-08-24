import express, { NextFunction } from "express";
import { Request, Response } from "express-serve-static-core";
import { searchValidator } from "./searchValidator";
import { validationResult } from "express-validator";
import { handleResponse } from "../index";
import { ErrorResponse, Status } from "../../libraries/IResponse";
import { CommonErrors } from "../../libraries/commonErrors";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import searchController from "./searchController";
import { SearchType } from "./searchType";

const router = express.Router();

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

router.get('/', searchValidator, checkPaginationParams,  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return handleResponse(new ErrorResponse(Status.FAIL, CommonErrors.BAD_PARAMETERS, HttpStatusCode.BAD_REQUEST), res);

    const { type, query, page, limit } = req.query;

    const result = await searchController.search(type as SearchType, query as string, Number(page), Number(limit));
    handleResponse(result, res);
})

export default router;
