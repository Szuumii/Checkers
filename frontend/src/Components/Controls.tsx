import React, {useState} from 'react';
import { useGlobalContext } from './context';

export default function Controls() {

  const {playerColor, join} = useGlobalContext();

  const [picked, setPicked] = useState<number>(1)

  const pickLight = () => {
    setPicked(1);
  }

  const pickDark = () => {
    setPicked(3);
  }

  return(
    <div className="button-container">
      { playerColor !== -1 || <button className="btn" onClick={pickLight}>Pick Light</button>}
      { playerColor !== -1 || <button className="btn" onClick={() => join(picked)}>Play!</button>}
      { playerColor !== -1 || <button className="btn" onClick={pickDark}>Pick Dark</button>}
    </div>
  );
}