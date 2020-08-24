import AppError from "../../libraries/error";
import { ErrorResponse, Status, SuccessResponse, IResponse } from "../../libraries/IResponse";
import { CommonErrors } from "../../libraries/commonErrors";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { Answer } from "./answersSchema";
import answersService from "./answersService";


class AnswersController {
    async submitAnswer(answer: Answer): Promise<IResponse> {
        const result = await answersService.saveAnswer(answer);
        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, CommonErrors.ASK_ERROR, result.httpCode);

        return new SuccessResponse(Status.SUCCESS, result, HttpStatusCode.CREATED);
    }
}

export default new AnswersController();