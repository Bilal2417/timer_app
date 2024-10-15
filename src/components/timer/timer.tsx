"use client";
import { useState, useEffect } from "react";

const Timer: React.FC = () => {
  const [displayTimer, setDisplayTimer] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && displayTimer > 0) {
      interval = setInterval(() => {
        setDisplayTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval!);
            setIsActive(false);
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [isActive, displayTimer]);

  const increaseTimerInMinutes = () => {
    setTime((prev) => {
      const newValue = prev + 1;
      setDisplayTimer(newValue * 60);
      return newValue;
    });
  };

  const decreaseTimerInMinutes = () => {
    setTime((prev) => {
      if (prev > 0) {
        const newValue = prev - 1;
        setDisplayTimer(newValue * 60);
        return newValue;
      }
      return prev;
    });
  };

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setDisplayTimer(0);
    setTime(0);
    setIsActive(false);
  };

  return (
    <div className="app-container">
      <h1 className="heading">Digital Timer</h1>
      <div className="digital-timer-container">
        <div className="timer-display-container">
          <div className="elapsed-time-container">
            <h1 className="elapsed-time">
              {formatTime(displayTimer)}
            </h1>
            <p className="timer-state">hello</p>
          </div>
        </div>
        <div className="controls-container">
          <div className="timer-controller-container">
            <button
              className="timer-controller-btn"
              onClick={() => setIsActive((prev) => !prev)}
              type="button"
            >
              <img
                className="timer-controller-icon"
                src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                alt="Start/Pause"
              />
              <p className="timer-controller-label">{isActive ? 'Pause' : 'Start'}</p>
            </button>
            <button
              className="timer-controller-btn"
              onClick={resetTimer}
              type="button"
            >
              <img
                alt="reset icon"
                className="timer-controller-icon"
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              />
              <p className="timer-controller-label">Reset</p>
            </button>
          </div>
          <div className="timer-limit-controller-container">
            <p className="limit-label">Set Timer limit</p>
            <div className="timer-limit-controller">
              <button
                className="limit-controller-button"
                onClick={decreaseTimerInMinutes}
                type="button"
                disabled={isActive}
              >
                -
              </button>
              <div className="limit-label-and-value-container">
                <p className="limit-value">{time}</p>
              </div>
              <button
                className="limit-controller-button"
                onClick={increaseTimerInMinutes}
                type="button"
                disabled={isActive}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
