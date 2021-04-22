import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import {contextType, Iboard, Ifield, PossibleMove} from "../types"
import { InitialBoard } from './data';


const AppContext =  React.createContext({} as contextType);

const AppProvider = ({children}:any) => {

  const [msg, setMsg] = useState("Pick side and click play!");

  const [socket, setSocket] = useState({} as SocketIOClient.Socket);

  const [playerColor, setPlayerColor] = useState(-1);

  const [board, setBoard] = useState<Ifield[]>(InitialBoard);

  const select = (id: number) => {
    // console.log(`Selected field ${id}`);
    let row = Math.floor(id / 8);
    let col = id % 8;
    socket.emit('select', {row, col}, (possibleMoves: PossibleMove[]) => {
      let newBoard = Array.from(Array(64).keys()).map((idx) => {
        return {id: idx, possible: false, value: board[idx].value}
      })

      for (let element of possibleMoves) {
        let idx = element[0] * 8 + element[1];
        // console.log(idx);
        newBoard[idx].possible = true;
      }
      setBoard(newBoard);
    })
  }

  // useEffect(() => {
  //   console.log(board);
  // }, [board]);

  const join = (color: number) => {
    setPlayerColor(color);
    socket.emit('join', {playerColor: color}, (newBoard: Iboard) => {
      const {board} = newBoard;
      const convertedBoard = Array.from(Array(64).keys()).map((idx) => {
        return {id: idx, possible: false, value: board[idx]}
      })
      setBoard(convertedBoard);
    })

    if (color === 1) {
      setMsg("Your turn to move");
    } else {
      setMsg("Waiting for computer's move");
      socket.emit('computer_move', (newBoard: Iboard) => {
        const {board} = newBoard;
        const convertedBoard = Array.from(Array(64).keys()).map((idx) => {
          return {id: idx, possible: false, value: board[idx]}
        })
        setBoard(convertedBoard);
        setMsg("Your turn to move");
      })
    }
  }

  const move = (id: number) => {
    let row = Math.floor(id / 8);
    let col = id % 8;

    socket.emit('move', {row, col}, (newBoard: Iboard) => {
      const {board} = newBoard;
      const convertedBoard = Array.from(Array(64).keys()).map((idx) => {
        return {id: idx, possible: false, value: board[idx]}
      })
      setBoard(convertedBoard);
    })

    setMsg("Waiting for computer's move");

    socket.emit('is_over', (is_over: number) => {
      if(is_over === -1){
        return
      } else if (is_over === 1) {
        alert("Light Won!")
      } else if (is_over === 3) {
        alert("Dark Won!")
      }
    })

    socket.emit('computer_move', (newBoard: Iboard) => {
      const {board} = newBoard;
      const convertedBoard = Array.from(Array(64).keys()).map((idx) => {
        return {id: idx, possible: false, value: board[idx]}
      })
      setMsg("Your turn to move");
      setBoard(convertedBoard);
    })

    socket.emit('is_over', (is_over: number) => {
      if(is_over === -1){
        return
      } else if (is_over === 1) {
        alert("Light Won!")
      } else if (is_over === 3) {
        alert("Dark Won!")
      }
    })

  }

  useEffect(() => {
    setSocket(io("http://localhost:8000"));
  }, [])


  return <AppContext.Provider value={{
    socket, 
    msg, 
    playerColor, 
    board,
    join,
    select,
    move
    }}>
    {children}
  </AppContext.Provider>

}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export {AppContext, AppProvider}