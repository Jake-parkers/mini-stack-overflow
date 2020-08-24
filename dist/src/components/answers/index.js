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
const answersValidator_1 = require("./answersValidator");
const express_validator_1 = require("express-validator");
const __1 = require("..");
const httpStatusCodes_1 = require("../../libraries/httpStatusCodes");
const commonErrors_1 = require("../../libraries/commonErrors");
const IResponse_1 = require("../../libraries/IResponse");
const answersController_1 = __importDefault(require("./answersController"));
const router = express_1.default.Router();
router.post('/submit', answersValidator_1.submitAnswerValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return __1.handleResponse(new IResponse_1.ErrorResponse(IResponse_1.Status.FAIL, commonErrors_1.CommonErrors.BAD_PARAMETERS, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST), res);
    const { questionId, answer, userId, excerpt } = req.body;
    const result = yield answersController_1.default.submitAnswer({ questionId, body: answer, userId, excerpt });
    __1.handleResponse(result, res);
}));
router.post;
exports.default = router;
//# sourceMappingURL=index.js.map