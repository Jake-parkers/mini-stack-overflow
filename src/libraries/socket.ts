import socketio from 'socket.io';
import { Server } from 'http';

class Socket {
  private io: socketio.Server;
  private stackOverClone: socketio.Namespace;

  init(server: Server) {
    this.io = socketio(server, { pingTimeout: 60000 });
    this.io.origins('*:*');
    this.stackOverClone = this.io.of('/stackoverclone-backend');
  }

  emit(event: string, ...args: any[]) {
    this.stackOverClone.emit(event, ...args);
  }
}

export default new Socket();
