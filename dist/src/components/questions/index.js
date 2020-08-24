"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const index_1 = require("../index");
const IResponse_1 = require("../../libraries/IResponse");
const httpStatusCodes_1 = require("../../libraries/httpStatusCodes");
const commonErrors_1 = require("../../libraries/commonErrors");
const questionsController_1 = __importDefault(require("./questionsController"));
const questionsValidator_1 = require("./questionsValidator");
const router = express_1.default.Router();
router.post('/ask', questionsValidator_1.askQuestionValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return index_1.handleResponse(new IResponse_1.ErrorResponse(IResponse_1.Status.FAIL, commonErrors_1.CommonErrors.BAD_PARAMETERS, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST), res);
    const { title, body, tags, userId, excerpt } = req.body;
    const result = yield questionsController_1.default.ask({ title, body, tags, askedBy: userId, excerpt });
    index_1.handleResponse(result, res);
}));
const checkPaginationParams = (req, res, next) => {
    if (!req.query.page) {
        // @ts-ignore
        req.query.page = Number(process.env.DEFAULT_PAGE);
    }
    if (!req.query.limit) {
        // @ts-ignore
        req.query.limit = Number(process.env.DEFAULT_LIMIT);
    }
    next();
};
router.get('/', checkPaginationParams, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = req.query;
    const result = yield questionsController_1.default.view(Number(page), Number(limit));
    index_1.handleResponse(result, res);
}));
router.post('/subscribe', questionsValidator_1.subscriptionValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionId, userId } = req.body;
    const result = yield questionsController_1.default.subscribe(userId, questionId);
    index_1.handleResponse(result, res);
}));
exports.default = router;
//# sourceMappingURL=index.js.map