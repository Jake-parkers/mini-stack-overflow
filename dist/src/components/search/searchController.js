"use strict";
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
const searchType_1 = require("./searchType");
const searchService_1 = __importDefault(require("./searchService"));
const error_1 = __importDefault(require("../../libraries/error"));
const IResponse_1 = require("../../libraries/IResponse");
const commonErrors_1 = require("../../libraries/commonErrors");
const httpStatusCodes_1 = require("../../libraries/httpStatusCodes");
class SearchController {
    search(type, query, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            switch (type) {
                case searchType_1.SearchType.QUESTION:
                    result = yield searchService_1.default.searchQuestions(query, page, limit);
                    if (result instanceof error_1.default)
                        return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, commonErrors_1.CommonErrors.ASK_ERROR, result.httpCode);
                    break;
                case searchType_1.SearchType.ANSWER:
                    result = yield searchService_1.default.searchAnswers(query, page, limit);
                    if (result instanceof error_1.default)
                        return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, commonErrors_1.CommonErrors.ASK_ERROR, result.httpCode);
                    break;
                case searchType_1.SearchType.TAG:
                    result = yield searchService_1.default.searchQuestionsByTag(query, page, limit);
                    if (result instanceof error_1.default)
                        return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, commonErrors_1.CommonErrors.ASK_ERROR, result.httpCode);
                    break;
                case searchType_1.SearchType.USER:
                    result = yield searchService_1.default.searchUsers(query, page, limit);
                    if (result instanceof error_1.default)
                        return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, commonErrors_1.CommonErrors.ASK_ERROR, result.httpCode);
                    break;
                default:
                    // in the default case simply search by questions
                    result = yield searchService_1.default.searchQuestions(query, page, limit);
                    if (result instanceof error_1.default)
                        return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, commonErrors_1.CommonErrors.ASK_ERROR, result.httpCode);
                    break;
            }
            return new IResponse_1.SuccessResponse(IResponse_1.Status.SUCCESS, result, httpStatusCodes_1.HttpStatusCode.OK);
        });
    }
}
exports.default = new SearchController();
//# sourceMappingURL=searchController.js.map