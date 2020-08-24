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

    async viewQuestions(data: {page: number, limit: number}) {
        try {
            const questions = await questionsDAL.getQuestions(data.page, data.limit);
            const totalQuestions = await questionsDAL.totalQuestions();
            const totalPages = Math.ceil(totalQuestions / data.limit);
            const response: Paginate = {
                totalPages,
                currentPage: data.page,
                data: questions,
                prevPage: data.page === 1 ? null : data.page - 1,
                nextPage: Utils.getNextPage(totalQuestions, totalPages, data.limit, data.page)
            }
            return response;
        } catch (error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);
        }
    }
}

export default new QuestionsService();