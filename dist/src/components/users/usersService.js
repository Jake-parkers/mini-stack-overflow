"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const usersDAL_1 = __importDefault(require("./usersDAL"));
const error_1 = __importStar(require("../../libraries/error"));
const httpStatusCodes_1 = require("../../libraries/httpStatusCodes");
const commonErrors_1 = require("../../libraries/commonErrors");
const utils_1 = __importDefault(require("../../libraries/utils"));
const usersDAL_2 = __importDefault(require("./usersDAL"));
class UsersService {
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield utils_1.default.generateSalt();
            user.password = yield utils_1.default.hashText(user.password, salt);
            try {
                const response = yield usersDAL_1.default.save(user);
                delete response.password;
                return response;
            }
            catch (error) {
                error_1.handler.handleError(error);
                return new error_1.default("", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.DATABASE_ERROR, false);
            }
        });
    }
    getUserDetails(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield usersDAL_2.default.getUserByEmail(email);
            }
            catch (error) {
                error_1.handler.handleError(error);
                return new error_1.default("", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.DATABASE_ERROR, false);
            }
        });
    }
    comparePasswords(plainPassword, hashsedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield utils_1.default.compareTexts(plainPassword, hashsedPassword);
        });
    }
    userExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield usersDAL_1.default.getUserByEmail(email);
                if (user)
                    return user;
                else
                    return false;
            }
            catch (error) {
                error_1.handler.handleError(error);
                return new error_1.default("", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.DATABASE_ERROR, false);
            }
        });
    }
}
exports.default = new UsersService();
//# sourceMappingURL=usersService.js.map