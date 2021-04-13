import React from "react"

export interface field {
  row: number,
  col: number,
  value: number
}

function Field(field: field) {

  const {row, col, value} = field;

  let fieldState= "";

  if(value === -1) {
    fieldState = "field-white"
  } else if (value === 0 ) {
    fieldState = "field-black"
  }


  return (
    <div 
      className={fieldState}>
    </div>
  );

}

export default Field;