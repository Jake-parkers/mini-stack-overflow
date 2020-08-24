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
const postsService_1 = __importDefault(require("./postsService"));
const error_1 = __importDefault(require("../../libraries/error"));
const IResponse_1 = require("../../libraries/IResponse");
const commonErrors_1 = require("../../libraries/commonErrors");
const httpStatusCodes_1 = require("../../libraries/httpStatusCodes");
class PostsController {
    vote(postId, userId, postType, voteType) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield postsService_1.default.vote(postId, userId, postType, voteType);
            if (result) {
                if (result instanceof error_1.default)
                    return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, commonErrors_1.CommonErrors.ASK_ERROR, result.httpCode);
                const updatedPost = yield result.toObject();
                updatedPost.upvotes = updatedPost.upvoters.length;
                updatedPost.downvotes = updatedPost.downvoters.length;
                return new IResponse_1.SuccessResponse(IResponse_1.Status.SUCCESS, updatedPost, httpStatusCodes_1.HttpStatusCode.CREATED);
            }
            else
                return new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, commonErrors_1.CommonErrors.INVALID_POST, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST);
        });
    }
}
exports.default = new PostsController();
//# sourceMappingURL=postsController.js.map