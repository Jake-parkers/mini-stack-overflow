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
        return QuestionModel.findById(id);
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

    async findQuestionByTag(queryTag: string, page: number, limit: number) {
        try {
            return await QuestionModel.find({ tags: {
                $in: [queryTag]
            }}).limit(limit).skip((page - 1) * limit);
        } catch(error) {
            throw error;
        }
    }

    async totalQuestionByTag(queryTag: string) {
        try {
            return await QuestionModel.find({ tags: {
                $in: [queryTag]
            }}).countDocuments();
        } catch (error) {
            throw error;
        }
    }

    async findQuestionByKeyword(query: string, page: number, limit: number) {
        try {
            // this uses text search with indexes on the `title` and `excerpt` fields of the Question Collection 
            return await QuestionModel.find({ $text: { $search: query } }).limit(limit).skip((page - 1) * limit);
        } catch (error) { 
            throw error;
        }
    }

    async totalQuestionByKeyword(query: string) {
        try {
            return await QuestionModel.find({ $text: { $search: query } }).countDocuments();
        } catch (error) {
            throw error;
        }
    }

    async saveSubscription(userId: string, questionId: string) {
        try {
             return await QuestionModel.findByIdAndUpdate(questionId, {
                 $addToSet: {
                    subscribers: userId
                 }
             }, { new: true })
        } catch(error) {
            throw error;
        }
    }

    async getSubscribers(questionId: string) {
        try {
            const question = await this.getQuestionById(questionId) as unknown as Question
            return !question ? [] : question.subscribers;
        } catch (error) {
            throw error
        }
    }
}

export default new QuestionsDAL();