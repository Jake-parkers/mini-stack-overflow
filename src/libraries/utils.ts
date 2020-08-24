import bcrypt from "bcrypt";
import AppError, { handler } from "./error";
import { HttpStatusCode } from "./httpStatusCodes";
import { CommonErrors } from "./commonErrors";
import jwt from "jsonwebtoken";

export interface JWTPayload {
    iss: string,
    aud: string,
    exp: number,
    iat: number
}

export interface Paginate {
    totalPages: number,
    prevPage: number | null,
    currentPage: number,
    nextPage: number | null,
    data: {[name: string]: any}
}

export default class Utils {
    static async generateSalt() {
        try {
            return await bcrypt.genSalt(Number(process.env.HASHING_ROUNDS));
        } catch (error) {
            handler.handleError(error);
            throw new AppError("Salt Error", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.SERVER_ERROR, true);
        }
    }

    static async hashText(text: string, salt: string) {
        try {
            return await bcrypt.hash(text, salt);
        } catch (error) {
            handler.handleError(error);
            throw new AppError("Hashing Error", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.SERVER_ERROR, true);
        }
    }

    static async compareTexts(plain: string, hashed: string) {
        try {
            return await bcrypt.compare(plain, hashed);
        } catch(error) {
            handler.handleError(error);
            throw new AppError("Comparing Hash Error", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.SERVER_ERROR, true);
        }
    }

    static async signToken(payload: JWTPayload) {
        return new Promise((resolve) => {
            jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256' }, (error, token) => {
                if (error) {
                    handler.handleError(error);
                    throw new AppError("JWT Sign Error", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.SERVER_ERROR, true);
                }
                else return resolve(token);
            });
        })
    }

    static async constructJWTPayload(additionalData: object) {
        let payload: JWTPayload = {
            iat: Math.floor(Date.now() / 1000),
            iss: process.env.API_ISSUER,
            exp: Math.floor(Date.now() /1000) + 86400, // 24 hrs from now
            aud: process.env.API_AUDIENCE,
        };

        for (let [key, value] of Object.entries(additionalData)) {
            payload[key] = value;
        }

        return payload;
    }

    static getNextPage(totalDocs: number, totalPages: number, limit: number, currentPage: number) {
        if ((totalDocs / limit) > 1) {
            const nextPage = currentPage + 1;
            if (nextPage > totalPages) return null
            return nextPage;
        }
        else return null
    }
}