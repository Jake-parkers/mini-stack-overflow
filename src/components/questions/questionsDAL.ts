import QuestionModel, { Question } from "./questionsSchema";

class QuestionsDAL {
    async getQuestion() {
        return QuestionModel.find({});
    }

    async getQuestionById(id: string) {
        return QuestionModel.findOne({id})
    }

    async save(question: Question) {
        const newQuestion = new QuestionModel(question);
        try {
            return await (await newQuestion.save()).toObject();
        } catch(error) {
            throw error;
        }
    }
}

export default new QuestionsDAL();