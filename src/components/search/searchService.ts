import AppError, { handler } from "../../libraries/error";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { CommonErrors } from "../../libraries/commonErrors";
import questionsDAL from "../questions/questionsDAL";
import answersDAL from "../answers/answersDAL";
import usersDAL from "../users/usersDAL";
import Utils from "../../libraries/utils";

class SearchService {
    async searchQuestions(query: string, page: number, limit: number) {
        try {
            const questions = await questionsDAL.findQuestionByKeyword(query, page, limit);
            const totalQuestions = await questionsDAL.totalQuestionByKeyword(query);
            return Utils.computePagination(totalQuestions, questions, page, limit);
        } catch(error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);  
        }
    }

    async searchQuestionsByTag(tag: string, page: number, limit: number) {
        try {
            const questions = await questionsDAL.findQuestionByTag(tag, page, limit);
            const totalQuestions = await questionsDAL.totalQuestionByTag(tag);
            return Utils.computePagination(totalQuestions, questions, page, limit);
        } catch(error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);  
        }
    }

    async searchAnswers(query: string, page: number, limit: number) {
        try {
            const answers = await answersDAL.findAnswersByKeyword(query, page, limit);
            const totalAnswers = await answersDAL.totalAnswersByKeyword(query);
            return Utils.computePagination(totalAnswers, answers, page, limit);
        } catch(error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);  
        }
    }

    async searchUsers(query: string, page: number, limit: number) {
        try {
            const users = await usersDAL.findUsersByName(query, page, limit);
            const totalUsers = await usersDAL.totalUsersByName(query);
            return Utils.computePagination(totalUsers, users, page, limit);
        } catch(error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);  
        }
    }
}

export default new SearchService();