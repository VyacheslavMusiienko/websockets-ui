import { webSocket } from './src/WS_server';
import { httpServer } from "./src/http_server/index";

const HTTP_PORT = 8181;
const WS_PORT =3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

webSocket(WS_PORT);

process.on('SIGINT', async () => {
  httpServer.close();
  console.log('Static server close');
  process.exit(0);
});
