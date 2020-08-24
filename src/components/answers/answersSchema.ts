import mongoose from "mongoose";

export interface Answer {
    questionId: string,
    userId: string,
    body: object
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
    }
}, {timestamps: true});


export default mongoose.model("Answer", AnswersSchema);
