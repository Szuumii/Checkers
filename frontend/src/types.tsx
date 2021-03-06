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
  select: (id: number) => void,
  move: (id: number) => void
}
