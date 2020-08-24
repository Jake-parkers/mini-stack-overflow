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

    async upvote(answerId: string, userId: string) {
        try {
            await AnswerModel.findByIdAndUpdate(answerId, {
                $addToSet: {
                    upvoters: userId
                }
            })
        } catch(error) {
            throw error;
        }
    }
}

export default new AnswersDAL();