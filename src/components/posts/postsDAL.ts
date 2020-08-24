import AnswerModel from "../answers/answersSchema";
import QuestionModel from "../questions/questionsSchema";
import { PostType } from "./postType";
import mongoose from "mongoose";

export enum VoteType {
    UP = "up",
    DOWN = "down"
}

export enum VoteFields {
    UPVOTERS = "upvoters",
    DOWNVOTERS = "downvoters"
}

class PostsDAL {
    private readonly _answerModel: typeof AnswerModel;
    private readonly _questionModel: typeof QuestionModel;

    constructor(answerModel: typeof AnswerModel, questionModel: typeof QuestionModel) {
        this._answerModel = answerModel;
        this._questionModel = questionModel;
    }

    async vote( postId: string, userId: string, postType:PostType, voteType:VoteType, field: VoteFields) {
        try {
            switch (postType) {
                case PostType.ANSWER:
                    return this.updateVote(postId, field, userId, this._answerModel, voteType);
                case PostType.QUESTION:
                    return this.updateVote(postId, field, userId, this._questionModel, voteType);
                default:
                    break;
            }
        } catch (error) {
            throw error;
        }
    }

    private async updateVote(id: string, field: string, value: string, model: typeof AnswerModel | typeof QuestionModel, type: VoteType) {
        const payload = {
            [field]: mongoose.Types.ObjectId(value)
        }
        try {
            switch (type) {
                case VoteType.UP:
                    await this.flipVote(model, id, VoteFields.DOWNVOTERS, mongoose.Types.ObjectId(value))

                    return await model.findByIdAndUpdate(id, {
                        $addToSet: payload
                    }, { new: true })
    
                case VoteType.DOWN:
                    await this.flipVote(model, id, VoteFields.UPVOTERS, mongoose.Types.ObjectId(value))
                    
                    return await model.findByIdAndUpdate(id, {
                        $addToSet: payload
                    }, { new: true })
                default:
                    break;
            }
        } catch (error) {
            throw error;
        }
    }

    private async flipVote(model: typeof AnswerModel | typeof QuestionModel, postId: string, field: VoteFields, value: mongoose.Types.ObjectId) {
        const payload = {
            [field]: value
        }
        try {
            await model.findByIdAndUpdate(postId, {
                $pull: payload
            }, { new : true});
        } catch(error) {
            throw error;
        }
    }
}

export default new PostsDAL(AnswerModel, QuestionModel);