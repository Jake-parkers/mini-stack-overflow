import express from "express";
import { Request, Response } from "express-serve-static-core";
import { upvoteValidator } from "./postsValidator";
import { validationResult } from "express-validator";
import { handleResponse } from "..";
import { ErrorResponse, Status } from "../../libraries/IResponse";
import { CommonErrors } from "../../libraries/commonErrors";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import PostsController from "./postsController";
import { PostType } from "./postType";
const router = express.Router();

router.post('/:postId/upvote', upvoteValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return handleResponse(new ErrorResponse(Status.FAIL, CommonErrors.BAD_PARAMETERS, HttpStatusCode.BAD_REQUEST), res);

    const { userId } = req.body;
    const { postType } = req.query;
    const { postId } = req.params;

    const result = await PostsController.upvote(postId as string, userId, postType === PostType.ANSWER ? PostType.ANSWER : PostType.QUESTION)
    handleResponse(result, res);
});

export default router;