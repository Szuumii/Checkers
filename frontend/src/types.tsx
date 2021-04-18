import { type } from "node:os";
import SocketIO from "socket.io";
import { SocketService } from "./Components/socketService";

export interface Ifield {
  id: number,
  possible: boolean,
  value: number
}

export interface Iboard {
  board: any[]
}

export type PossibleMove = [row:number, col:number]


export interface contextType {
  socket: SocketIOClient.Socket,
  msg: string,
  playerColor: number,
  board: Ifield[],
  join: (color: number) => void,
  select: (key: number) => void
}
