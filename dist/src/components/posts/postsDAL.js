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
exports.VoteFields = exports.VoteType = void 0;
const answersSchema_1 = __importDefault(require("../answers/answersSchema"));
const questionsSchema_1 = __importDefault(require("../questions/questionsSchema"));
const postType_1 = require("./postType");
const mongoose_1 = __importDefault(require("mongoose"));
var VoteType;
(function (VoteType) {
    VoteType["UP"] = "up";
    VoteType["DOWN"] = "down";
})(VoteType = exports.VoteType || (exports.VoteType = {}));
var VoteFields;
(function (VoteFields) {
    VoteFields["UPVOTERS"] = "upvoters";
    VoteFields["DOWNVOTERS"] = "downvoters";
})(VoteFields = exports.VoteFields || (exports.VoteFields = {}));
class PostsDAL {
    constructor(answerModel, questionModel) {
        this._answerModel = answerModel;
        this._questionModel = questionModel;
    }
    vote(postId, userId, postType, voteType, field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                switch (postType) {
                    case postType_1.PostType.ANSWER:
                        return this.updateVote(postId, field, userId, this._answerModel, voteType);
                    case postType_1.PostType.QUESTION:
                        return this.updateVote(postId, field, userId, this._questionModel, voteType);
                    default:
                        break;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateVote(id, field, value, model, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                [field]: mongoose_1.default.Types.ObjectId(value)
            };
            try {
                switch (type) {
                    case VoteType.UP:
                        yield this.flipVote(model, id, VoteFields.DOWNVOTERS, mongoose_1.default.Types.ObjectId(value));
                        return yield model.findByIdAndUpdate(id, {
                            $addToSet: payload
                        }, { new: true });
                    case VoteType.DOWN:
                        yield this.flipVote(model, id, VoteFields.UPVOTERS, mongoose_1.default.Types.ObjectId(value));
                        return yield model.findByIdAndUpdate(id, {
                            $addToSet: payload
                        }, { new: true });
                    default:
                        break;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    flipVote(model, postId, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                [field]: value
            };
            try {
                yield model.findByIdAndUpdate(postId, {
                    $pull: payload
                }, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new PostsDAL(answersSchema_1.default, questionsSchema_1.default);
//# sourceMappingURL=postsDAL.js.map