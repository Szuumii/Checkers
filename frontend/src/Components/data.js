const InitialBoard = Array.from(Array(64).keys()).map((idx) => {
  let fieldState;
  let row = Math.floor(idx / 8);
  let col = idx % 8;

  if (row % 2 === 0) {
    fieldState = col % 2 === 0 ? "field-black" : "field-white";
  } else {
    fieldState = col % 2 === 1 ? "field-black" : "field-white";
  }
   

  return({id: idx, fieldState})
});


export default InitialBoard;