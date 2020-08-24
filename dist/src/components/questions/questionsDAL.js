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
const questionsSchema_1 = __importDefault(require("./questionsSchema"));
class QuestionsDAL {
    getQuestions(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return questionsSchema_1.default.find({}).limit(limit).skip((page - 1) * limit);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getQuestionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return questionsSchema_1.default.findById(id);
        });
    }
    save(question) {
        return __awaiter(this, void 0, void 0, function* () {
            const newQuestion = new questionsSchema_1.default(question);
            try {
                return yield (yield newQuestion.save()).toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    totalQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield questionsSchema_1.default.countDocuments();
            }
            catch (error) {
                throw error;
            }
        });
    }
    findQuestionByTag(queryTag, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield questionsSchema_1.default.find({ tags: {
                        $in: [queryTag]
                    } }).limit(limit).skip((page - 1) * limit);
            }
            catch (error) {
                throw error;
            }
        });
    }
    totalQuestionByTag(queryTag) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield questionsSchema_1.default.find({ tags: {
                        $in: [queryTag]
                    } }).countDocuments();
            }
            catch (error) {
                throw error;
            }
        });
    }
    findQuestionByKeyword(query, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // this uses text search with indexes on the `title` and `excerpt` fields of the Question Collection 
                return yield questionsSchema_1.default.find({ $text: { $search: query } }).limit(limit).skip((page - 1) * limit);
            }
            catch (error) {
                throw error;
            }
        });
    }
    totalQuestionByKeyword(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield questionsSchema_1.default.find({ $text: { $search: query } }).countDocuments();
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveSubscription(userId, questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield questionsSchema_1.default.findByIdAndUpdate(questionId, {
                    $addToSet: {
                        subscribers: userId
                    }
                }, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    getSubscribers(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const question = yield this.getQuestionById(questionId);
                return !question ? [] : question.subscribers;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new QuestionsDAL();
//# sourceMappingURL=questionsDAL.js.map