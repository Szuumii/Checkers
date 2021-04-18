import React, { useContext, useEffect, useState } from 'react'
import { from } from 'rxjs';
import io from 'socket.io-client'
import { SocketService } from './socketService';
import {contextType, Iboard, PossibleMove} from "../types"
import { InitialBoard } from './data';


const AppContext =  React.createContext({} as contextType);

const AppProvider = ({children}:any) => {

  const [msg, setMsg] = useState("Pick side and click play!");

  const [socket, setSocket] = useState({} as SocketIOClient.Socket);

  const [playerColor, setPlayerColor] = useState(-1);

  const [board, setBoard] = useState(InitialBoard);

  const select = (id: number) => {
    // console.log(`Selected field ${id}`);
    let row = Math.floor(id / 8);
    let col = id % 8;
    let newBoard = [...board];
    socket.emit('select', {row, col}, (possibleMoves: PossibleMove[]) => {
      possibleMoves.map((tuple: PossibleMove) => { 
        let idx = tuple[0] * 8 + tuple[1];
        console.log(idx);
        newBoard[idx].possible = true;
      })
    })
    setBoard(newBoard);
  }

  const join = (color: number) => {
    setPlayerColor(color);
    socket.emit('join', {playerColor: color}, (newBoard: Iboard) => {
      const {board} = newBoard;
      const convertedBoard = Array.from(Array(64).keys()).map((idx) => {
        return {id: idx, possible: false, value: board[idx]}
      })
      setBoard(convertedBoard);
    })
  }

  useEffect(() => {
    setSocket(io("http://localhost:8000"));
    console.log("Connected");
  }, [])

  // useEffect(() => {
  //   if(!socket) return

  // }, [socket])


  return <AppContext.Provider value={{
    socket, 
    msg, 
    playerColor, 
    board,
    join,
    select
    }}>
    {children}
  </AppContext.Provider>

}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export {AppContext, AppProvider}