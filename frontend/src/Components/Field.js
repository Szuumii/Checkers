import React from "react"


function Field({field}) {

  const {id, fieldState} = field;

  return (
    <div 
      id={id}
      className={fieldState}>
    </div>
  );

}

export default Field;