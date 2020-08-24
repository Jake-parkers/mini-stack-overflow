import PostsService from "./postsService";
import { PostType } from "./postType";
import AppError from "../../libraries/error";
import { ErrorResponse, Status, SuccessResponse, FailResponse } from "../../libraries/IResponse";
import { CommonErrors } from "../../libraries/commonErrors";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { Question } from "../questions/questionsSchema";
import { Answer } from "../answers/answersSchema";
import { VoteType } from "./postsDAL";

class PostsController {
    async vote(postId: string, userId: string, postType: PostType, voteType: VoteType) {
        let result = await PostsService.vote(postId, userId, postType, voteType);

        if (result) {
            if (result instanceof AppError) return new ErrorResponse(Status.ERROR, CommonErrors.ASK_ERROR, result.httpCode);
            
            const updatedPost = await result.toObject() as Question | Answer;
            updatedPost.upvotes = updatedPost.upvoters.length;
            updatedPost.downvotes = updatedPost.downvoters.length;
            return new SuccessResponse(Status.SUCCESS, updatedPost, HttpStatusCode.CREATED);
            
        } else return new FailResponse(Status.FAIL, {}, CommonErrors.INVALID_POST, HttpStatusCode.BAD_REQUEST)
    }
}

export default new PostsController();