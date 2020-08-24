import { Question } from "./questionsSchema";
import questionsService from "./questionsService";
import AppError from "../../libraries/error";
import { ErrorResponse, Status, SuccessResponse } from "../../libraries/IResponse";
import { CommonErrors } from "../../libraries/commonErrors";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { Paginate } from "../../libraries/utils";

class QuestionsController {
    async ask(question: Question) {
        const result = await questionsService.saveQuestion(question);
        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, CommonErrors.ASK_ERROR, result.httpCode);

        return new SuccessResponse(Status.SUCCESS, result, HttpStatusCode.CREATED);
    }

    async view(page: number, limit: number) {
        let result = await questionsService.viewQuestions(page, limit);
        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, "", result.httpCode);
        return new SuccessResponse(Status.SUCCESS, result, HttpStatusCode.OK);
    }
}

export default new QuestionsController();