import { useState } from "react";

// useVisualMode custom hook used in components/Appointment/index.js
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (next, replace = false) => {
    if (!replace) {
      setHistory(prev => ([...prev, next]));
    } else {
      setHistory(prev => ([...prev.slice(0, -1), next]));
    }

  }




  const back = () => {
    if(history.length > 1) {
      setHistory(prev => ([...prev.slice(0, -1)]));
    }
    
  }

  return { mode: history[history.length - 1], transition, back };
};