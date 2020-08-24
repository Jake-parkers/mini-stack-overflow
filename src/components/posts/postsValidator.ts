import { body, query, param } from "express-validator";
import { PostType } from "./postType";
import { VoteType } from "./postsDAL";

export const voteValidator = [
    param("postId").notEmpty().trim().escape().isMongoId(),
    body("userId").notEmpty().trim().escape().isMongoId(),
    query("postType").custom(value => {
        if (value === PostType.ANSWER || value === PostType.QUESTION) return true;
        else return Promise.reject("Invalid post type");
    }),
    query("voteType").custom(value => {
        if (value === VoteType.UP || value === VoteType.DOWN) return true;
        else return Promise.reject("Invalid vote type");
    })
]