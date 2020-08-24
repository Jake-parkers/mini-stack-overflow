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
const answersSchema_1 = __importDefault(require("./answersSchema"));
class AnswersDAL {
    save(answer) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAnswer = new answersSchema_1.default(answer);
            try {
                return yield (yield newAnswer.save()).toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAnswersByKeyword(query, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // this uses text search with indexes on the `title` and `excerpt` fields of the Question Collection 
                return yield answersSchema_1.default.find({ $text: { $search: query } }).limit(limit).skip((page - 1) * limit);
            }
            catch (error) {
                throw error;
            }
        });
    }
    totalAnswersByKeyword(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // this uses text search with indexes on the `title` and `excerpt` fields of the Question Collection 
                return yield answersSchema_1.default.find({ $text: { $search: query } }).countDocuments();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new AnswersDAL();
//# sourceMappingURL=answersDAL.js.map