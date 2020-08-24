import mongoose from "mongoose";

export interface Question {
    title: string,
    body: object,
    tags: string[],
    askedBy: string
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
    }
}, {timestamps: true});


export default mongoose.model("Question", QuestionsSchema);
