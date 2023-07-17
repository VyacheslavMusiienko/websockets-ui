import { WebSocket } from 'ws';
import {v4 as uuid} from 'uuid';
import { IPlayer } from '../type';


export const createPlayer = (name: string, password: string, ws: WebSocket) => {
  const id = uuid();
  const player: IPlayer = {
    name,
    password,
    wins: 0,
    id,
    isPlaying: false,
    error: false,
    errorText: '',
    ws,
  };

  return {
    ...player,
    getInfo: () => ({
      name: player.name,
      index: player.id,
      error: player.error,
      errorText: player.errorText,
    }),
  };
};