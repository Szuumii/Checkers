import React from "react"

import InitialBoard from "./data"
import Field from "./Field"

function Board() {

  const board = InitialBoard;

  return(
    <div className="board">
      {Array.from(Array(64).keys()).map(idx => <Field key={idx} field={board[idx]}/>)}
    </div>
  );
}

export default Board;