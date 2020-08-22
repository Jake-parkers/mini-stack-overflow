import dbConfig from "../config/mongo";
import mongoose from "mongoose";
import Logger from "../libraries/logger";
import {handler as errorHandler} from "../libraries/error"

class Mongo {
    constructor() {
        this.init();
    }
    
    async init() {
        try {
            await mongoose.connect(dbConfig.mongoUri, dbConfig.config);
        } catch(error) {
            errorHandler.handleError(error);
        }

        mongoose.connection.on('connected', () => {
            Logger.info(`Mongoose connection to ${dbConfig.mongoUri} successful`);
        });
    
        mongoose.connection.on('error', (err) => {
            Logger.error(`Mongoose connection error ${err}`);
        });
    
        mongoose.connection.on('disconnected', () => {
            Logger.info("Mongoose connection disconnected")
        })
    }
}

export default new Mongo();