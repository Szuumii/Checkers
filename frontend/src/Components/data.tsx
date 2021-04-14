import {field} from "./Field"

const generateBoard = (isWhite: boolean) => {
  let board = new Array(8);
  let value: number;
  let key: string;

  for (let row = 0; row < board.length; row++) {
    // let single_row: field[] = [];
    board[row] = new Array(8)
    for (let col = 0; col < board[row].length; col++) {
      key = (row * 8 + col).toString();
      if(row % 2 === 0) {
        value = (col % 2 === 0) ? -1 : 0;
        let field: field = {key,value};
        board[row][col] = field;
      } else {
        value = (col % 2 === 1) ? -1 : 0;
        let field : field = {key, value};
        board[row][col] = field;
      }
    }
  }

  const player = isWhite ? 1 : 3;
  const ai = isWhite ? 3 : 1;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 8; j++) {
      if(board[i][j].value === 0) {
        board[i][j].value = ai;
      }
    }
  }

  for (let i = 5; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if(board[i][j].value === 0) {
        board[i][j].value = player;
      }
    }
  }

  return board;
}


export let InitialBoard = generateBoard(true);