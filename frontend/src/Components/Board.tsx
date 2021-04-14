import React, {useState} from "react"

import { InitialBoard } from "./data";
import Field, { field } from "./Field"

function Board() {

  const [board, setBoard] = useState(InitialBoard);

  console.log(board);

  return(
    <div className="board">
      {board.map((single_row) => {
        return single_row.map((single_field: field) => {
          return <Field key={single_field.key} value={single_field.value}/>
        })
    })}
    </div>
  );
}

export default Board;