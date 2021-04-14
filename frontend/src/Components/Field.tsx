import React from "react"

export interface field {
  key: string,
  value: number
}

function Field(field: field) {

  const {value} = field;

  if(value === -1) {
    return (
      <div className="field-white">
      </div>
    );
  } else if (value === 0 ) {
    return (
      <div className="field-black">
      </div>
    );
  } else if (value === 1) {
    return (
      <div className="field-black">
          <div className="white-piece"></div>
      </div>
    );
  } else if (value === 3) {
    return (
      <div className="field-black">
          <div className="black-piece"></div>
      </div>
    );
  }


  return (
    <div 
      className="field-black">
    </div>
  );

}

export default Field;