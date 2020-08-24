import mongoose from "mongoose";

export interface Answer {
    questionId: string,
    userId: string,
    body: object,
    upvoters?: string[],
    upvotes?: number
}

const AnswersSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    body: {
        type: Object,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    upvoters: {
        type: Array,
        required: false
    }
}, {timestamps: true});


export default mongoose.model("Answer", AnswersSchema);
