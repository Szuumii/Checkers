import React from "react"
import {Ifield} from "../types"
import { useGlobalContext } from "./context";

function Field(field: Ifield) {

  const {playerColor, select} = useGlobalContext();

  const {id, possible, value} = field;

  if(value === -1) {
    return (
      <div/>
    );
  } 
  
  if (playerColor === 1){
    return (
      <div className="field-black">
          { value === 1 && <div className="white-piece" onClick={() => select(id)}></div>}
          { value === 3 && <div className="black-piece"></div>}
      </div>
    );
  }

  if (playerColor === 3) {
    return (
      <div className="field-black">
          { value === 1 && <div className="white-piece"></div>}
          { value === 3 && <div className="black-piece" onClick={() => select(id)}></div>}
      </div>
    );
  }

  return (
    <div className="field-black">
      {possible && <div className="possible"/>}
    </div>
  );

}

export default Field;