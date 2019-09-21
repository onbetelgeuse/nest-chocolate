import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Client } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private readonly logger: Logger = new Logger('EventsGateway');

  constructor() {}

  public afterInit(server: any) {
    this.logger.log('Init');
  }

  public handleConnection(client: Client, ...args: any[]) {
    this.logger.log(args);
    this.logger.log(`Client connected: ${client.id}`);
  }

  public handleDisconnect(client: Client) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('propertyChanged')
  public handleMessage(client: Client, payload: any): string {
    this.logger.log(`Property changed: ${client.id}`);
    return 'Hello world!';
  }
}
