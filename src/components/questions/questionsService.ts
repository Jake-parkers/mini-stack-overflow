import { Question } from "./questionsSchema";
import questionsDAL from "./questionsDAL";
import AppError, { handler } from "../../libraries/error";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { CommonErrors } from "../../libraries/commonErrors";
import Utils, { Paginate } from "../../libraries/utils";

class QuestionsService {
    async saveQuestion(question: Question) {
        try {
            return await questionsDAL.save(question);
        } catch (error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);
        }
    }

    async viewQuestions(page: number, limit: number) {
        try {
            const questions = await questionsDAL.getQuestions(page, limit);
            const totalQuestions = await questionsDAL.totalQuestions();
            return Utils.computePagination(totalQuestions, questions, page, limit);
        } catch (error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);
        }
    }

    async createSubscription(userId: string, questionId: string) {
        try {
            return await questionsDAL.saveSubscription(userId, questionId);
        } catch (error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);
        }
    }
}

export default new QuestionsService();