import WebSocket from 'ws';

export interface IMessage {
  type: string;
  data: string;
  id: number;
}
export interface IMessageData {
  name: string;
  password: string;
}

export interface IShip {
  position: {
      x: number,
      y: number,
  },
  direction: boolean,
  length: number,
  type: "small"|"medium"|"large"|"huge",
}

export interface IPlayer{
  name: string;
  password: string;
  wins: number;
  id: string;
  ws: WebSocket;
  isPlaying: boolean;
  error: boolean;
  errorText: string;
  ships?: IShip[];
}

export interface IParamsPlayer extends IPlayer {
  getInfo: () => {
    name: string;
    index: string;
    error: boolean;
    errorText: string;
};
}