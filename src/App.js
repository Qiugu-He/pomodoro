import React, { useState, useRef } from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0');
}

export default function App() {
  const [title, setTitle] = useState('Let the countdown begin!!!');
  const [timeLeft, setTimeLeft] = useState(15);
  const [isRunning, setIsRunning] = useState(false);

  const currTimeRef = useRef(null);

  function startTimer() {
    // check if the currTimeRef is already running. If it is, return nothing
    if (currTimeRef.current !== null) return;
    setTitle(`You're doing great!`);
    setIsRunning(true);
    
    /**
     * Set up an interval to update the timer every second
     * 
     * currTimeRef.current = setInterval(...) assigns the return value of setInterval to currTimeRef.current.
     * 
     *  setInterval: a js function repeatedly calls the callback funtion at every second
     *  currTimeRef: a React useRef hook that creates a mutable object ({ current: ... }) to persist values across renders.
     *  currTimeRef.current: refers to the current value of the mutable object created by useRef
     * 
    */
    currTimeRef.current = setInterval(() => {
      // callback function, update the timeLeft state
      setTimeLeft((timeLeft) => {
        // If there's still time remaining, decrement it by 1
        if (timeLeft >= 1) return timeLeft - 1;

        // Interval continues to run until the time reaches 0. The time is up, reset the timer
        resetTimer();

        // Return 0 to stop the interval
        return 0;
      });
    }, 1000);
  }

  function resetTimer() {
    clearInterval(currTimeRef.current);
    currTimeRef.current = null;
    setTitle('Ready to go another round?');
    setTimeLeft(25 * 60);
    setIsRunning(false);
  }

  function stopTimer() {
    if (currTimeRef.current === null) return;
    clearInterval(currTimeRef.current);
    currTimeRef.current = null;
    setTitle('Keep it up!');
    setIsRunning(false);
  }


  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        
        {/* conditional render, the component following && will only be rendered if the condition before it is true.*/}
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
