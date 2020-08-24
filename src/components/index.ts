import express, { NextFunction } from "express";
import { IResponse, FailResponse, Status } from "../libraries/IResponse";
import { Request, Response } from "express-serve-static-core";
import jsonwebtoken from "jsonwebtoken";
import { HttpStatusCode } from "../libraries/httpStatusCodes";
import { CommonErrors } from "../libraries/commonErrors";

import users from "./users";
import questions from "./questions";
import answers from "./answers";
import posts from "./posts";
import search from "./search";

const router = express.Router();

const requireAuthentication = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return handleResponse(new FailResponse(Status.FAIL, {}, CommonErrors.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED), res);
    }

    let token = req.headers.authorization.split(" ");
    if (token[0] !== 'Bearer') {
        return handleResponse(new FailResponse(Status.FAIL, {}, CommonErrors.INVALID_TOKEN_TYPE, HttpStatusCode.BAD_REQUEST), res);
    }
    jsonwebtoken.verify(token[1], process.env.JWT_SECRET, {
        algorithms: ["HS256"],
        audience: process.env.API_AUDIENCE,
        issuer: process.env.API_ISSUER
    }, (err, decoded: {userId: string}) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return handleResponse(new FailResponse(Status.FAIL, {}, "Expired Token", HttpStatusCode.BAD_REQUEST), res);
            } else return handleResponse(new FailResponse(Status.FAIL, {}, CommonErrors.INVALID_TOKEN, HttpStatusCode.BAD_REQUEST), res);
        }
        // attach user id to body of authenticated requests;
        req.body.userId = decoded.userId;
        next();
    })
};

export const handleResponse = function(
    response: IResponse,
    res: Response<any>,
  ) {
    let resp = Object.assign({}, response);
    delete resp.httpCode;
    res.status(response.httpCode).send(resp)
  };


router.get('/', (req: Request, res: Response) => {
    res.status(200).send("Mini Stack Overflow Clone");
});

router.use('/users', users);

router.use(requireAuthentication);

router.use('/questions', questions);

router.use('/answers', answers);

router.use('/posts', posts);

router.use('/search', search);

export default router;