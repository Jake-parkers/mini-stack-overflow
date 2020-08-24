import AppError, { handler } from "../../libraries/error";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { CommonErrors } from "../../libraries/commonErrors";
import { Answer } from "./answersSchema";
import answersDAL from "./answersDAL";

class AnswersService {
    async saveAnswer(answer: Answer) {
        try {
            return await answersDAL.save(answer);
        } catch (error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);
        }
    }
}

export default new AnswersService();