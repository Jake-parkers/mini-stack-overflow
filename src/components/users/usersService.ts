import UsersDAL from "./usersDAL";
import { User } from "./usersSchema";
import AppError, { handler } from "../../libraries/error";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import {CommonErrors} from "../../libraries/commonErrors"
import Utils from "../../libraries/utils"
import usersDAL from "./usersDAL";

class UsersService {
    async signup(user: User) {
        const salt = await Utils.generateSalt();
        user.password = await Utils.hashText(user.password, salt);
        try {
            const response: User = await UsersDAL.save(user);
            delete response.password;
            return response;
        } catch (error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);
        }
    }

    async getUserDetails(email: string) {
        try {
            return await usersDAL.getUserByEmail(email);
        } catch(error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);
        }
    }

    async comparePasswords(plainPassword: string, hashsedPassword: string) {
        return await Utils.compareTexts(plainPassword, hashsedPassword);
    }

    async userExists(email: string) {
        try {
            const user = await UsersDAL.getUserByEmail(email);
            if (user) return user;
            else return false;
        } catch (error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);
        }
    }


}

export default new UsersService();