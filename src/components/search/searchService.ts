import AppError, { handler } from "../../libraries/error";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { CommonErrors } from "../../libraries/commonErrors";
import QuestionsDAL from "../questions/questionsDAL";
import AnswersDAL from "../answers/answersDAL";
import UsersDAL from "../users/usersDAL";
import Utils from "../../libraries/utils";

class SearchService {
    private readonly _questionsDAL: typeof QuestionsDAL;
    private readonly _answersDAL: typeof AnswersDAL;
    private readonly _userssDAL: typeof UsersDAL;

    constructor(questionsDAL: typeof QuestionsDAL, answersDAL: typeof AnswersDAL, usersDAL: typeof UsersDAL) {
        this._answersDAL = answersDAL;
        this._questionsDAL = questionsDAL;
        this._userssDAL = usersDAL;
    }
    
    async searchQuestions(query: string, page: number, limit: number) {
        try {
            const questions = await this._questionsDAL.findQuestionByKeyword(query, page, limit);
            const totalQuestions = await this._questionsDAL.totalQuestionByKeyword(query);
            return Utils.computePagination(totalQuestions, questions, page, limit);
        } catch(error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);  
        }
    }

    async searchQuestionsByTag(tag: string, page: number, limit: number) {
        try {
            const questions = await this._questionsDAL.findQuestionByTag(tag, page, limit);
            const totalQuestions = await this._questionsDAL.totalQuestionByTag(tag);
            return Utils.computePagination(totalQuestions, questions, page, limit);
        } catch(error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);  
        }
    }

    async searchAnswers(query: string, page: number, limit: number) {
        try {
            const answers = await this._answersDAL.findAnswersByKeyword(query, page, limit);
            const totalAnswers = await this._answersDAL.totalAnswersByKeyword(query);
            return Utils.computePagination(totalAnswers, answers, page, limit);
        } catch(error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);  
        }
    }

    async searchUsers(query: string, page: number, limit: number) {
        try {
            const users = await this._userssDAL.findUsersByName(query, page, limit);
            const totalUsers = await this._userssDAL.totalUsersByName(query);
            return Utils.computePagination(totalUsers, users, page, limit);
        } catch(error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);  
        }
    }
}

export default new SearchService(QuestionsDAL, AnswersDAL, UsersDAL);