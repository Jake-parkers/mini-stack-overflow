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
const usersController_1 = __importDefault(require("./usersController"));
const IResponse_1 = require("../../libraries/IResponse");
const httpStatusCodes_1 = require("../../libraries/httpStatusCodes");
const commonErrors_1 = require("../../libraries/commonErrors");
const index_1 = require("../index");
const usersValidator_1 = require("./usersValidator");
const router = express_1.default.Router();
router.post('/register', usersValidator_1.registrationValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return index_1.handleResponse(new IResponse_1.ErrorResponse(IResponse_1.Status.FAIL, commonErrors_1.CommonErrors.BAD_PARAMETERS, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST), res);
    const { displayName, email, password } = req.body;
    const result = yield usersController_1.default.saveUser({ displayName, email, password });
    index_1.handleResponse(result, res);
}));
router.post('/login', usersValidator_1.loginValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return index_1.handleResponse(new IResponse_1.ErrorResponse(IResponse_1.Status.FAIL, commonErrors_1.CommonErrors.BAD_PARAMETERS, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST), res);
    const { email, password } = req.body;
    const result = yield usersController_1.default.login({ email, password });
    index_1.handleResponse(result, res);
}));
exports.default = router;
//# sourceMappingURL=index.js.map