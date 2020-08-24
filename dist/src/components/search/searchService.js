"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importStar(require("../../libraries/error"));
const httpStatusCodes_1 = require("../../libraries/httpStatusCodes");
const commonErrors_1 = require("../../libraries/commonErrors");
const questionsDAL_1 = __importDefault(require("../questions/questionsDAL"));
const answersDAL_1 = __importDefault(require("../answers/answersDAL"));
const usersDAL_1 = __importDefault(require("../users/usersDAL"));
const utils_1 = __importDefault(require("../../libraries/utils"));
class SearchService {
    constructor(questionsDAL, answersDAL, usersDAL) {
        this._answersDAL = answersDAL;
        this._questionsDAL = questionsDAL;
        this._userssDAL = usersDAL;
    }
    searchQuestions(query, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const questions = yield this._questionsDAL.findQuestionByKeyword(query, page, limit);
                const totalQuestions = yield this._questionsDAL.totalQuestionByKeyword(query);
                return utils_1.default.computePagination(totalQuestions, questions, page, limit);
            }
            catch (error) {
                error_1.handler.handleError(error);
                return new error_1.default("", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.DATABASE_ERROR, false);
            }
        });
    }
    searchQuestionsByTag(tag, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const questions = yield this._questionsDAL.findQuestionByTag(tag, page, limit);
                const totalQuestions = yield this._questionsDAL.totalQuestionByTag(tag);
                return utils_1.default.computePagination(totalQuestions, questions, page, limit);
            }
            catch (error) {
                error_1.handler.handleError(error);
                return new error_1.default("", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.DATABASE_ERROR, false);
            }
        });
    }
    searchAnswers(query, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const answers = yield this._answersDAL.findAnswersByKeyword(query, page, limit);
                const totalAnswers = yield this._answersDAL.totalAnswersByKeyword(query);
                return utils_1.default.computePagination(totalAnswers, answers, page, limit);
            }
            catch (error) {
                error_1.handler.handleError(error);
                return new error_1.default("", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.DATABASE_ERROR, false);
            }
        });
    }
    searchUsers(query, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this._userssDAL.findUsersByName(query, page, limit);
                const totalUsers = yield this._userssDAL.totalUsersByName(query);
                return utils_1.default.computePagination(totalUsers, users, page, limit);
            }
            catch (error) {
                error_1.handler.handleError(error);
                return new error_1.default("", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.DATABASE_ERROR, false);
            }
        });
    }
}
exports.default = new SearchService(questionsDAL_1.default, answersDAL_1.default, usersDAL_1.default);
//# sourceMappingURL=searchService.js.map