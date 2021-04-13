import React, {useState} from "react"

import Field, { field } from "./Field"


const generateBoard = () => {
  let board = Array(8).fill(Array(8));
  let value: number;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if(row % 2 == 0) {
        value = (col % 2 == 0) ? -1 : 0;
        let field: field = {row, col, value};
        board[row][col] = field
      } else {
        value = (col % 2 == 1) ? -1 : 0;
        let field: field = {row, col, value};
        board[row][col] = field
      }
    }
  }
  return board;
}

// const setUpPieces = (board: field[], isWhite: boolean) => {
//   const player = isWhite ? 1 : 3;
//   const ai = isWhite ? 3 : 1;

//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 8; j++) {
//       if(board[i][j] == 0) {
//         board[i][j] = ai;
//       }
//     }
//   }

//   for (let i = 5; i < 8; i++) {
//     for (let j = 0; j < 8; j++) {
//       if(board[i][j] == 0) {
//         board[i][j] = player;
//       }
//     }
//   }
// }

function Board() {

  const [board, setBoard] = useState(generateBoard());

  console.log(board);

  return(
    <div className="board">
      {}
    </div>
  );
}

export default Board;