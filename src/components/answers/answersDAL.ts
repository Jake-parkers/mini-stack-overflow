import AnswerModel, { Answer } from "./answersSchema";
import usersDAL from "../users/usersDAL";
class AnswersDAL {
    async save(answer: Answer) {
        const newAnswer = new AnswerModel(answer);
        try {
            return await (await newAnswer.save()).toObject();
        } catch(error) {
            throw error;
        }
    }

    async findAnswersByKeyword(query: string, page: number, limit: number) {
        try {
            // this uses text search with indexes on the `title` and `excerpt` fields of the Question Collection 
            return await AnswerModel.find({ $text: { $search: query } }).limit(limit).skip((page - 1) * limit);
        } catch (error) { 
            throw error;
        }
    }

    async totalAnswersByKeyword(query: string) {
        try {
            // this uses text search with indexes on the `title` and `excerpt` fields of the Question Collection 
            return await AnswerModel.find({ $text: { $search: query } }).countDocuments()
        } catch (error) { 
            throw error;
        }
    }
}

export default new AnswersDAL();