import React from "react"
import {Ifield} from "../types"
import { useGlobalContext } from "./context";

function Field(field: Ifield) {

  const {playerColor, select, move} = useGlobalContext();

  const {id, possible, value} = field;

  if(value === -1) {
    return (
      <div/>
    );
  }

  if (possible === true) {
    return (
      <div className="field-black" onClick={() => move(id)}>
        <div className="possible"/>
      </div>
    );
  }
  
  if (playerColor === 1){
    return (
      <div className="field-black">
          { value === 1 && <div className="white-piece" onClick={() => select(id)}/>}
          { value === 2 && <div className="white-piece" onClick={() => select(id)}><div className="white-king"/></div>}
          { value === 3 && <div className="black-piece" onClick={() => select(id)}/>}
          { value === 4 && <div className="black-piece" onClick={() => select(id)}><div className="black-king"/></div>}
      </div>
    );
  }

  if (playerColor === 3) {
    return (
      <div className="field-black">
          { value === 1 && <div className="white-piece" onClick={() => select(id)}/>}
          { value === 2 && <div className="white-piece" onClick={() => select(id)}><div className="white-king"/></div>}
          { value === 3 && <div className="black-piece" onClick={() => select(id)}/>}
          { value === 4 && <div className="black-piece" onClick={() => select(id)}><div className="black-king"/></div>}
      </div>
    );
  }  

  return (
    <div className="field-black"/>
  );

}

export default Field;