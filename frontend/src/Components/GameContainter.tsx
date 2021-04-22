import React from "react"
import Notifications from './Notifications'
import Board from "./Board"
import Controls from "./Controls"

export default function GameContainer() {

  return(
    <div className="game-container">
      <Notifications />
      <Board/>
      <Controls />
    </div>
  );
}