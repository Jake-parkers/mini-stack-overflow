import UsersService from "./usersService";
import { User } from "./usersSchema";
import usersService from "./usersService";
import { Status, FailResponse, ErrorResponse, SuccessResponse, IResponse } from "../../libraries/IResponse";
import { CommonErrors } from "../../libraries/commonErrors";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import AppError from "../../libraries/error";
import Utils from "../../libraries/utils";


class UsersController {
    async saveUser(user: User): Promise<IResponse> {
        const userExists = await UsersService.userExists(user.email);
        if (userExists) return new FailResponse(Status.FAIL, {}, CommonErrors.USER_EXISTS, HttpStatusCode.BAD_REQUEST);
        
        const result = await usersService.signup(user);
        if (result instanceof AppError) return new ErrorResponse(Status.ERROR, CommonErrors.UNSUCCESSFUL_SIGNUP, result.httpCode);

        return new SuccessResponse(Status.SUCCESS, result, HttpStatusCode.CREATED);
    }

    async login(user: Pick<User, "email" | "password">): Promise<IResponse> {
        const response = await usersService.getUserDetails(user.email);
        if (response) {
            if (response instanceof AppError) return new ErrorResponse(Status.ERROR, CommonErrors.SERVER_ERROR, response.httpCode);

            const isAMatch = await usersService.comparePasswords(user.password, response.password);

            if (isAMatch) {
                const payload = await Utils.constructJWTPayload({userId: response._id});
                const token = await Utils.signToken(payload);

                return new SuccessResponse(Status.SUCCESS, {token}, HttpStatusCode.OK);

            } else return new FailResponse(Status.FAIL, {}, CommonErrors.INVALID_PASSWORD, HttpStatusCode.BAD_REQUEST);

        } else return new FailResponse(Status.FAIL, {}, CommonErrors.INVALID_USER, HttpStatusCode.BAD_REQUEST);

    }
}

export default new UsersController();