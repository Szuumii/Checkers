import React from "react"
import Field from "./Field"
import {Ifield} from "../types"
import { useGlobalContext } from "./context"

export default function Board() {

  const {board} = useGlobalContext();

  return(
    <div className="board">
      {board.map((field: Ifield) => {
        return <Field key={field.id.toString()} id={field.id} possible={field.possible} value={field.value}/>
      })}
    </div>
  );
}