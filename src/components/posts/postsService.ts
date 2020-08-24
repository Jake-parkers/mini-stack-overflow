import PostsDAL, { VoteFields, VoteType } from "./postsDAL";
import { PostType } from "./postType";
import AppError, { handler } from "../../libraries/error";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { CommonErrors } from "../../libraries/commonErrors";

class PostsService {
    async vote(postId: string, userId: string, postType:PostType, voteType: VoteType) {
        try {
            return await PostsDAL.vote(postId, userId, postType, voteType, voteType === VoteType.UP ? VoteFields.UPVOTERS : VoteFields.DOWNVOTERS);
        } catch (error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);
        }
    }
}

export default new PostsService()