import app from "./src/app";
import Logger from "./src/libraries/logger";
import { handler } from "./src/libraries/error";

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

app.listen(port, () => {
    console.log(`Server listening on Port ${port}\n Press Ctrl-C to stop it\n`);
});