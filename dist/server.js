"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const error_1 = require("./src/libraries/error");
const logger_1 = __importDefault(require("./src/libraries/logger"));
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("./src/libraries/socket"));
const mongoose_1 = __importDefault(require("mongoose"));
const server = http_1.default.createServer(app_1.default);
socket_1.default.init(server);
const port = process.env.PORT || 3000;
server.listen(port, () => {
    logger_1.default.info(`Server listening on Port ${port}\n Press Ctrl-C to stop it\n`);
});
const closeOpenConnections = (errorOccurred) => {
    logger_1.default.info('Shutting down server and open connections');
    server.close(() => {
        logger_1.default.info('Server shut down');
        mongoose_1.default.connection.close(() => {
            logger_1.default.info('Mongoose connection closed');
            process.exit(errorOccurred ? 1 : 0);
        });
    });
};
process.on('unhandledRejection', reason => {
    throw reason;
});
process.on('uncaughtException', (error) => {
    error_1.handler.handleError(error);
    if (!error_1.handler.isTrustedError(error)) {
        closeOpenConnections(true);
    }
});
process.on('SIGTERM', () => {
    logger_1.default.info('SIGTERM Signal Received');
    closeOpenConnections(false);
});
process.on('SIGINT', () => {
    logger_1.default.info('SIGINT Signal Received');
    closeOpenConnections(false);
});
//# sourceMappingURL=server.js.map