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
Object.defineProperty(exports, "__esModule", { value: true });
const postsDAL_1 = __importStar(require("./postsDAL"));
const error_1 = __importStar(require("../../libraries/error"));
const httpStatusCodes_1 = require("../../libraries/httpStatusCodes");
const commonErrors_1 = require("../../libraries/commonErrors");
class PostsService {
    vote(postId, userId, postType, voteType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield postsDAL_1.default.vote(postId, userId, postType, voteType, voteType === postsDAL_1.VoteType.UP ? postsDAL_1.VoteFields.UPVOTERS : postsDAL_1.VoteFields.DOWNVOTERS);
            }
            catch (error) {
                error_1.handler.handleError(error);
                return new error_1.default("", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.DATABASE_ERROR, false);
            }
        });
    }
}
exports.default = new PostsService();
//# sourceMappingURL=postsService.js.map