import PostsDAL from "./postsDAL";
import { PostType } from "./postType";
import AppError, { handler } from "../../libraries/error";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { CommonErrors } from "../../libraries/commonErrors";

class PostsService {
    async upvote(postId: string, userId: string, postType:PostType) {
        try {
            return await PostsDAL.upvote(postId, userId, postType);
        } catch (error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);
        }
    }
}

export default new PostsService()