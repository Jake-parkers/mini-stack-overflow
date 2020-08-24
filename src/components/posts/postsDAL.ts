import AnswerModel from "../answers/answersSchema";
import QuestionModel from "../questions/questionsSchema";
import { PostType } from "./postType";

class PostsDAL {
    private readonly _answerModel: typeof AnswerModel;
    private readonly _questionModel: typeof QuestionModel;

    constructor(answerModel: typeof AnswerModel, questionModel: typeof QuestionModel) {
        this._answerModel = answerModel;
        this._questionModel = questionModel;
    }

    async upvote( postId: string, userId: string, postType:PostType ) {
        try {
            switch (postType) {
                case PostType.ANSWER:
                    return await this._answerModel.findByIdAndUpdate(postId, {
                        $addToSet: {
                            upvoters: userId
                        }
                    }, { new: true });
                case PostType.QUESTION:
                    return await this._questionModel.findByIdAndUpdate(postId, {
                        $addToSet: {
                            upvoters: userId
                        }
                    }, { new: true });
                default:
                    break;
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new PostsDAL(AnswerModel, QuestionModel);