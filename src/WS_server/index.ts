import WebSocket, { WebSocketServer } from 'ws';
import { IMessage, IMessageData, IPlayer } from '../type';
import { createPlayer } from './player';

const roomConnection = new Set<IPlayer>();

export const webSocket = async (port: number) => {
  const wss = new WebSocketServer({port: port, clientTracking: true});

  wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message) => {
      const messageString = message.toString('utf-8');
      const messageObject: IMessage = JSON.parse(messageString);

      const messageType = messageObject.type;

      switch (messageType) {
        case 'reg':
          const messageData: IMessageData = JSON.parse(messageObject.data);
          const player: IPlayer = createPlayer(messageData.name, messageData.password, ws);
          roomConnection.add(player);

          const res = JSON.stringify({
            type: "reg",
            data: JSON.stringify(player),
            id: 0,
          });
          ws.send(res);
          break;

        default:
          break;
      }
      console.log(messageObject);

      ws.send(messageString);
    });
  });

  console.log(`WebSocket server is running on port ${port}`);

  process.on('SIGINT', async () => {
    wss.close();
    console.log('WebSocket server closed');
  })
};