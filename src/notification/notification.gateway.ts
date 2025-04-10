import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(6001, {
  cors: {
    origin: '*',
  },
})
export class NotificationGateway {
  @WebSocketServer() server: Server;

  sendNotify(channel: string, item: object) {
    this.server.emit(channel, item);
  }
}