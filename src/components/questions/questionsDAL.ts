import QuestionModel, { Question } from "./questionsSchema";

class QuestionsDAL {
    async getQuestions(page: number, limit: number) {
        try {
            return QuestionModel.find({}).limit(limit).skip((page - 1) * limit);
        } catch (error) {
            throw error;
        }
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

    async totalQuestions() {
        try {
            return await QuestionModel.countDocuments();
        } catch(error) {
            throw error;
        }
    }

    async upvote(questionId: string, userId: string) {
        try {
            await QuestionModel.findByIdAndUpdate(questionId, {
                $addToSet: {
                    upvoters: userId
                }
            })
        } catch(error) {
            throw error;
        }
    }
}

export default new QuestionsDAL();