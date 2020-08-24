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
const usersSchema_1 = __importDefault(require("./usersSchema"));
class UsersDAL {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return usersSchema_1.default.find({});
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersSchema_1.default.findOne({ id });
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield usersSchema_1.default.findOne({ email });
                return !user ? null : yield user.toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new usersSchema_1.default(user);
            try {
                return yield (yield newUser.save()).toObject();
            }
            catch (error) {
                throw error;
            }
        });
    }
    findUsersByName(query, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield usersSchema_1.default.find({
                    displayName: { $regex: '(?i).*' + query + '.*' }
                }).select("-password").limit(limit).skip((page - 1) * limit);
            }
            catch (error) {
                throw error;
            }
        });
    }
    totalUsersByName(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield usersSchema_1.default.find({
                    displayName: { $regex: '(?i).*' + query + '.*' }
                }).select("-password").countDocuments();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new UsersDAL();
//# sourceMappingURL=usersDAL.js.map