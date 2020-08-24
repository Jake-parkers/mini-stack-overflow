"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = void 0;
const express_1 = __importDefault(require("express"));
const IResponse_1 = require("../libraries/IResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpStatusCodes_1 = require("../libraries/httpStatusCodes");
const commonErrors_1 = require("../libraries/commonErrors");
const users_1 = __importDefault(require("./users"));
const questions_1 = __importDefault(require("./questions"));
const answers_1 = __importDefault(require("./answers"));
const posts_1 = __importDefault(require("./posts"));
const search_1 = __importDefault(require("./search"));
const router = express_1.default.Router();
const requireAuthentication = (req, res, next) => {
    if (!req.headers.authorization) {
        return exports.handleResponse(new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, commonErrors_1.CommonErrors.UNAUTHORIZED, httpStatusCodes_1.HttpStatusCode.UNAUTHORIZED), res);
    }
    let token = req.headers.authorization.split(" ");
    if (token[0] !== 'Bearer') {
        return exports.handleResponse(new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, commonErrors_1.CommonErrors.INVALID_TOKEN_TYPE, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST), res);
    }
    jsonwebtoken_1.default.verify(token[1], process.env.JWT_SECRET, {
        algorithms: ["HS256"],
        audience: process.env.API_AUDIENCE,
        issuer: process.env.API_ISSUER
    }, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return exports.handleResponse(new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, "Expired Token", httpStatusCodes_1.HttpStatusCode.BAD_REQUEST), res);
            }
            else
                return exports.handleResponse(new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, commonErrors_1.CommonErrors.INVALID_TOKEN, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST), res);
        }
        // attach user id to body of authenticated requests;
        req.body.userId = decoded.userId;
        next();
    });
};
exports.handleResponse = function (response, res) {
    let resp = Object.assign({}, response);
    delete resp.httpCode;
    res.status(response.httpCode).send(resp);
};
router.get('/', (req, res) => {
    res.status(200).send("Mini Stack Overflow Clone");
});
router.use('/users', users_1.default);
router.use(requireAuthentication);
router.use('/questions', questions_1.default);
router.use('/answers', answers_1.default);
router.use('/posts', posts_1.default);
router.use('/search', search_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map