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
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = __importStar(require("./error"));
const httpStatusCodes_1 = require("./httpStatusCodes");
const commonErrors_1 = require("./commonErrors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Utils {
    static generateSalt() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt_1.default.genSalt(Number(process.env.HASHING_ROUNDS));
            }
            catch (error) {
                error_1.handler.handleError(error);
                throw new error_1.default("Salt Error", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.SERVER_ERROR, true);
            }
        });
    }
    static hashText(text, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt_1.default.hash(text, salt);
            }
            catch (error) {
                error_1.handler.handleError(error);
                throw new error_1.default("Hashing Error", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.SERVER_ERROR, true);
            }
        });
    }
    static compareTexts(plain, hashed) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt_1.default.compare(plain, hashed);
            }
            catch (error) {
                error_1.handler.handleError(error);
                throw new error_1.default("Comparing Hash Error", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.SERVER_ERROR, true);
            }
        });
    }
    static signToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256' }, (error, token) => {
                    if (error) {
                        error_1.handler.handleError(error);
                        throw new error_1.default("JWT Sign Error", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, commonErrors_1.CommonErrors.SERVER_ERROR, true);
                    }
                    else
                        return resolve(token);
                });
            });
        });
    }
    static constructJWTPayload(additionalData) {
        return __awaiter(this, void 0, void 0, function* () {
            let payload = {
                iat: Math.floor(Date.now() / 1000),
                iss: process.env.API_ISSUER,
                exp: Math.floor(Date.now() / 1000) + 86400,
                aud: process.env.API_AUDIENCE,
            };
            for (let [key, value] of Object.entries(additionalData)) {
                payload[key] = value;
            }
            return payload;
        });
    }
    static computePagination(total, data, page, limit) {
        const totalPages = Math.ceil(total / limit);
        const response = {
            totalPages,
            currentPage: page,
            data,
            prevPage: page === 1 ? null : page - 1,
            nextPage: Utils.getNextPage(total, totalPages, limit, page)
        };
        return response;
    }
    static getNextPage(totalDocs, totalPages, limit, currentPage) {
        if ((totalDocs / limit) > 1) {
            const nextPage = currentPage + 1;
            if (nextPage > totalPages)
                return null;
            return nextPage;
        }
        else
            return null;
    }
}
exports.default = Utils;
//# sourceMappingURL=utils.js.map