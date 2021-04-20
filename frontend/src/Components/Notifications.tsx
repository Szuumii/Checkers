import React, {useEffect} from 'react'
import { useGlobalContext } from './context';



function Notifications() {

  const {msg} = useGlobalContext();

  return (
    <div className="notifications">
      {msg}
    </div>
  );
}

export default Notifications;