import mongoose from "mongoose";

export interface Question {
    title: string,
    body: object,
    tags: string[],
    askedBy: string,
    upvoters?: string[],
    upvotes?: number
}

const QuestionsSchema = new mongoose.Schema({
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
        type: mongoose.Types.ObjectId,
        required: true
    },
    upvoters: {
        type: Array,
        required: false
    }
}, {timestamps: true});


export default mongoose.model("Question", QuestionsSchema);
