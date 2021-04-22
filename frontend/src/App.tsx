import React from "react"
import Header from "./Components/Header"
import GameContainer from './Components/GameContainter'
import Footer from './Components/Footer'


export default function App() {
  return (
    <div className="App">
      <Header/>
      <GameContainer/>
      <Footer/> 
    </div>
  );
}
