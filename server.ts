import app from "./src/app";
import { handler } from "./src/libraries/error";
import logger from "./src/libraries/logger";
import http from "http";
import Socket from "./src/libraries/socket";
import mongoose from "mongoose";

const server = http.createServer(app);

Socket.init(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    logger.info(`Server listening on Port ${port}\n Press Ctrl-C to stop it\n`);
});

const closeOpenConnections = (errorOccurred: boolean) => {
    logger.info('Shutting down server and open connections');
    server.close(() => {
        logger.info('Server shut down');
        mongoose.connection.close(() => {
            logger.info('Mongoose connection closed');
            process.exit(errorOccurred ? 1 : 0);
        });
    });
  };

process.on('unhandledRejection', reason => {
    throw reason;
});

process.on('uncaughtException', (error: Error) => {
    handler.handleError(error);
    if (!handler.isTrustedError(error)) {
        closeOpenConnections(true);
    }
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM Signal Received');
    closeOpenConnections(false);
});

process.on('SIGINT', () => {
    logger.info('SIGINT Signal Received');
    closeOpenConnections(false);
});