import app from "./src/app";
import { handler } from "./src/libraries/error";
import logger from "./src/libraries/logger";
import http from "http";
import Socket from "./src/libraries/socket";

const server = http.createServer(app);

Socket.init(server);

const port = process.env.PORT || 3000;

process.on('unhandledRejection', reason => {
    throw reason;
});

process.on('uncaughtException', (error: Error) => {
    handler.handleError(error);
    if (!handler.isTrustedError(error)) {
        // do clean up here
    }
});

server.listen(port, () => {
    logger.info(`Server listening on Port ${port}\n Press Ctrl-C to stop it\n`);
});