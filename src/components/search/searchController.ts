import { SearchType } from "./searchType";
import searchService from "./searchService";
import AppError from "../../libraries/error";
import { ErrorResponse, Status, SuccessResponse } from "../../libraries/IResponse";
import { CommonErrors } from "../../libraries/commonErrors";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { Document } from "mongoose"
import { Paginate } from "../../libraries/utils";

class SearchController {
    async search(type: SearchType, query: string, page: number, limit: number) {
        let result: Paginate | AppError | Document[];
        switch (type) {
            case SearchType.QUESTION:
                result = await searchService.searchQuestions(query as string, page, limit);
                if (result instanceof AppError) return new ErrorResponse(Status.ERROR, CommonErrors.ASK_ERROR, result.httpCode);

                break;
            case SearchType.ANSWER:
                result = await searchService.searchAnswers(query as string, page, limit);
                if (result instanceof AppError) return new ErrorResponse(Status.ERROR, CommonErrors.ASK_ERROR, result.httpCode);

                break;

            case SearchType.TAG:
                result = await searchService.searchQuestionsByTag(query as string, page, limit);
                if (result instanceof AppError) return new ErrorResponse(Status.ERROR, CommonErrors.ASK_ERROR, result.httpCode);
                break;

            case SearchType.USER:
                result = await searchService.searchUsers(query as string, page, limit);
                if (result instanceof AppError) return new ErrorResponse(Status.ERROR, CommonErrors.ASK_ERROR, result.httpCode);
                break;
            default:
                // in the default case simply search by questions
                result = await searchService.searchQuestions(query as string, page, limit);
                if (result instanceof AppError) return new ErrorResponse(Status.ERROR, CommonErrors.ASK_ERROR, result.httpCode);
                break;
        }
        return new SuccessResponse(Status.SUCCESS, result, HttpStatusCode.OK);
    }
}

export default new SearchController();