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
const usersService_1 = __importDefault(require("./usersService"));
const usersService_2 = __importDefault(require("./usersService"));
const IResponse_1 = require("../../libraries/IResponse");
const commonErrors_1 = require("../../libraries/commonErrors");
const httpStatusCodes_1 = require("../../libraries/httpStatusCodes");
const error_1 = __importDefault(require("../../libraries/error"));
const utils_1 = __importDefault(require("../../libraries/utils"));
class UsersController {
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield usersService_1.default.userExists(user.email);
            if (userExists)
                return new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, commonErrors_1.CommonErrors.USER_EXISTS, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST);
            const result = yield usersService_2.default.signup(user);
            if (result instanceof error_1.default)
                return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, commonErrors_1.CommonErrors.UNSUCCESSFUL_SIGNUP, result.httpCode);
            return new IResponse_1.SuccessResponse(IResponse_1.Status.SUCCESS, result, httpStatusCodes_1.HttpStatusCode.CREATED);
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield usersService_2.default.getUserDetails(user.email);
            if (response) {
                if (response instanceof error_1.default)
                    return new IResponse_1.ErrorResponse(IResponse_1.Status.ERROR, commonErrors_1.CommonErrors.SERVER_ERROR, response.httpCode);
                const isAMatch = yield usersService_2.default.comparePasswords(user.password, response.password);
                if (isAMatch) {
                    const payload = yield utils_1.default.constructJWTPayload({ userId: response._id });
                    const token = yield utils_1.default.signToken(payload);
                    return new IResponse_1.SuccessResponse(IResponse_1.Status.SUCCESS, { token }, httpStatusCodes_1.HttpStatusCode.OK);
                }
                else
                    return new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, commonErrors_1.CommonErrors.INVALID_PASSWORD, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST);
            }
            else
                return new IResponse_1.FailResponse(IResponse_1.Status.FAIL, {}, commonErrors_1.CommonErrors.INVALID_USER, httpStatusCodes_1.HttpStatusCode.BAD_REQUEST);
        });
    }
}
exports.default = new UsersController();
//# sourceMappingURL=usersController.js.map