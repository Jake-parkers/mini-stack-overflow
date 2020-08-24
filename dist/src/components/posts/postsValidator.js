"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteValidator = void 0;
const express_validator_1 = require("express-validator");
const postType_1 = require("./postType");
const postsDAL_1 = require("./postsDAL");
exports.voteValidator = [
    express_validator_1.param("postId").notEmpty().trim().escape().isMongoId(),
    express_validator_1.body("userId").notEmpty().trim().escape().isMongoId(),
    express_validator_1.query("postType").custom(value => {
        if (value === postType_1.PostType.ANSWER || value === postType_1.PostType.QUESTION)
            return true;
        else
            return Promise.reject("Invalid post type");
    }),
    express_validator_1.query("voteType").custom(value => {
        if (value === postsDAL_1.VoteType.UP || value === postsDAL_1.VoteType.DOWN)
            return true;
        else
            return Promise.reject("Invalid vote type");
    })
];
//# sourceMappingURL=postsValidator.js.map