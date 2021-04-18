import {Ifield} from "../types"

export const InitialBoard = Array.from(Array(64).keys()).map((idx) => {
  let value: number;
  let possible = true;
  let row = Math.floor(idx / 8);
  let col = idx % 8;

  if (row % 2 === 1) {
    value = col % 2 === 0 ? 0 : -1;
  } else {
    value = col % 2 === 1 ? 0 : -1;
  }


  return({id: idx, possible, value} as Ifield)
});