import { Question } from "./questionsSchema";
import questionsDAl from "./questionsDAL";
import AppError, { handler } from "../../libraries/error";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { CommonErrors } from "../../libraries/commonErrors";

class QuestionsService {
    async saveQuestion(question: Question) {
        try {
            return await questionsDAl.save(question);
        } catch (error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);
        }
    }
}

export default new QuestionsService();