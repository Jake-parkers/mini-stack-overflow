"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./libraries/logger"));
const cors_1 = __importDefault(require("cors"));
const components_1 = __importDefault(require("./components"));
const mongodb_1 = __importDefault(require("./database/mongodb"));
const stream = {
    write: (text) => {
        logger_1.default.info(text);
    },
};
mongodb_1.default();
const app = express_1.default();
app.use(cors_1.default());
if (process.env.NODE_ENV === 'development')
    app.use(morgan_1.default('tiny'));
else
    app.use(morgan_1.default('combined', { stream }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/api', components_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map