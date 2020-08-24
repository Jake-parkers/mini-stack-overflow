"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
class Socket {
    init(server) {
        this.io = socket_io_1.default(server, { pingTimeout: 60000 });
        this.io.origins('*:*');
        this.stackOverClone = this.io.of('/stackoverclone-backend');
    }
    emit(event, ...args) {
        this.stackOverClone.emit(event, ...args);
    }
}
exports.default = new Socket();
//# sourceMappingURL=socket.js.map