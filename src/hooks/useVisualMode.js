import React, { useState, useEffect } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // function transition(mode, replace) {
  //   setMode(mode);
  //   if (replace) {
  //     setHistory(prev => [prev[0]]);
  //     history.push(mode);
  //   }
  //   setHistory(history);
  // }

  function transition(mode, replace) {
    setMode(mode);
    if (replace) {
      setHistory(prev => [prev[0]]);
    }
    setHistory(prev => [...prev, mode]);
  }

  function back() { 
    if (history.length > 1) {
      history.pop();
      setHistory(history);
  
      setMode(history[history.length - 1]);
    } else {
      setMode(history[0])
    }
  }

  return { mode, transition, back };

}
