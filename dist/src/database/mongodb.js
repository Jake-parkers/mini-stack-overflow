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
const mongo_1 = __importDefault(require("../config/mongo"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../libraries/logger"));
const error_1 = require("../libraries/error");
const initiateMongodb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongo_1.default.mongoUri, mongo_1.default.config);
    }
    catch (error) {
        error_1.handler.handleError(error);
    }
    mongoose_1.default.connection.on('connected', () => {
        logger_1.default.info(`Mongoose connection to ${mongo_1.default.mongoUri} successful`);
    });
    mongoose_1.default.connection.on('error', (err) => {
        logger_1.default.error(`Mongoose connection error ${err}`);
    });
    mongoose_1.default.connection.on('disconnected', () => {
        logger_1.default.info("Mongoose connection disconnected");
    });
});
exports.default = initiateMongodb;
//# sourceMappingURL=mongodb.js.map