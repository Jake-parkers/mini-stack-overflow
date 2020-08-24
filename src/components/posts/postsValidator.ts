import { body, query, param } from "express-validator";
import { PostType } from "./postType";

export const upvoteValidator = [
    param("postId").notEmpty().trim().escape().isMongoId(),
    body("userId").notEmpty().trim().escape().isMongoId(),
    query("postType").custom(value => {
        if (value === PostType.ANSWER || value === PostType.QUESTION) return true;
        else return Promise.reject("Invalid post type");
    })
]