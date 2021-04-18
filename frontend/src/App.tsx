import React, {useContext, useEffect} from "react"
import Header from "./Components/Header"
import GameContainer from './Components/GameContainter'
import Footer from './Components/Footer'
import { AppContext } from "./Components/context"


export default function App() {

  const connection = useContext(AppContext);

  return (
    <div className="App">
      <Header/>
      <GameContainer/>
      <Footer/> 
    </div>
  );
}
