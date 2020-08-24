"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AnswersSchema = new mongoose_1.default.Schema({
    questionId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    body: {
        type: Object,
        required: true
    },
    excerpt: {
        type: String,
        required: true,
        maxlength: 200
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    upvoters: {
        type: Array,
        required: false
    },
    downvoters: {
        type: Array,
        required: false
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Answer", AnswersSchema);
//# sourceMappingURL=answersSchema.js.map