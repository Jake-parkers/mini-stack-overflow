"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const QuestionsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: Object,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
    askedBy: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    excerpt: {
        type: String,
        required: true,
        maxlength: 200
    },
    upvoters: {
        type: Array,
        required: false,
        default: []
    },
    downvoters: {
        type: Array,
        required: false,
        default: []
    },
    subscribers: {
        type: Array,
        required: false,
        default: []
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Question", QuestionsSchema);
//# sourceMappingURL=questionsSchema.js.map