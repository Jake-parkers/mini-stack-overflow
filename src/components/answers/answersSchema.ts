import mongoose from "mongoose";

export interface Answer {
    questionId: string,
    userId: string,
    body: object,
    upvoters?: string[],
    downvoters?: string[],
    upvotes?: number,
    downvotes?: number,
    excerpt: string
}

const AnswersSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    body: {
        type: Array,
        required: true
    },
    excerpt: {
        type: String,
        required: true,
        maxlength: 200
    },
    userId: {
        type: mongoose.Types.ObjectId,
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
}, {timestamps: true});


export default mongoose.model("Answer", AnswersSchema);
