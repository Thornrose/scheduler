import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (next, replace = false) => {
    if (!replace) {
      setHistory(prev => ([...prev, mode]));
    }
      setMode(next);
    }

  const back = () => {
      
      setMode(history[history.length - 1]);
    
  }

  return { mode, transition, back };
};