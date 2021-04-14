import React from "react"

import Notifications from './Notifications'
import Board from "./Board"

function GameContainer() {
  return(
    <div className="game-container">
      <Notifications />
      <Board/>
    </div>
  );
}


export default GameContainer;