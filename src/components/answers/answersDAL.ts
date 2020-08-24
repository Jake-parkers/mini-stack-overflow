import AnswerModel, { Answer } from "./answersSchema";

class AnswersDAL {
    async save(answer: Answer) {
        const newAnswer = new AnswerModel(answer);
        try {
            return await (await newAnswer.save()).toObject();
        } catch(error) {
            throw error;
        }
    }
}

export default new AnswersDAL();