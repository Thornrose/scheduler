import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (next, replace = false) => {
    if (!replace) {
      setHistory((prev) => {
        prev.push(next);
        return prev;
      });
    }
      setMode(next);
    }

  const back = () => {
    if(history.length > 1) {
      const bufferArray = history;
      bufferArray.pop();
      setMode(bufferArray[bufferArray.length - 1]);
    }
  }

  return { mode, transition, back };
};