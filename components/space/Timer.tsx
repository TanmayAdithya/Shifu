import React, { useEffect, useRef, useState } from "react";
import MinimizeWidget from "./MinimizeWidget";
import { PiPlayPauseFill as PlayPause } from "react-icons/pi";
import { GrPowerReset as Reset } from "react-icons/gr";
import { GoStopwatch as Stopwatch } from "react-icons/go";
import { FaPause as Paused } from "react-icons/fa6";
import { FaPlay as Running } from "react-icons/fa6";

type Props = { openTimerWidget: boolean };

const Timer = ({ openTimerWidget }: Props) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isStopwatch, setIsStopwatch] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (stopwatchRunning) {
      timerRef.current = setInterval(() => {
        if (isStopwatch) {
          setSeconds((prev) => {
            if (prev === 59) {
              setMinutes((m) => m + 1);
              return 0;
            }
            return prev + 1;
          });
        } else {
          setTimerRunning((prev) => !prev);
          setSeconds((prev) => {
            if (prev === 0) {
              if (minutes === 0) {
                clearInterval(timerRef.current!);
                setStopwatchRunning(false);
                return 0;
              }
              setMinutes((m) => (m > 0 ? m - 1 : m));
              return 59;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else if (!stopwatchRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current!);
  }, [stopwatchRunning, isStopwatch, minutes]);

  const handleStartPause = () => {
    setStopwatchRunning(!stopwatchRunning);
  };

  const handleReset = () => {
    setStopwatchRunning(false);
    setMinutes(0);
    setSeconds(0);
  };

  const handleSetTime = (min: number, sec: number) => {
    setMinutes((prevMin) => prevMin + min);
    setSeconds((prevSec) => prevSec + sec);
  };

  return (
    <div
      className={`${openTimerWidget ? "" : "hidden"} absolute bottom-80 right-[35rem] z-10 aspect-square w-72 rounded-3xl bg-white p-7`}
    >
      <div className="relative mb-6 rounded-xl border border-neutral-300 bg-neutral-200/60 text-center">
        <div
          className="pointer-events-none absolute left-[57%] top-1 select-none text-xs text-neutral-600"
          style={{ transform: `translateX(${String(minutes).length * 7}px)` }}
        >
          M
        </div>
        <div
          className="pointer-events-none absolute bottom-10 right-[12%] select-none text-xs text-neutral-600"
          style={{ transform: `translateX(${String(minutes).length * 6}px)` }}
        >
          S
        </div>
        <span className="pointer-events-none mr-1 select-none text-8xl tracking-tighter text-neutral-700">
          {String(minutes).padStart(2, "0")}
        </span>
        <span className="pointer-events-none select-none text-5xl tracking-tighter text-neutral-700">
          {String(seconds).padStart(2, "0")}
        </span>
      </div>

      <div className={`mb-4 flex items-center justify-between`}>
        <button
          onClick={() => handleSetTime(10, 0)}
          disabled={isStopwatch}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-all duration-300 ${isStopwatch ? "pointer-events-none opacity-25" : "hover:bg-neutral-700 hover:text-neutral-100"}`}
        >
          10M
        </button>
        <button
          onClick={() => handleSetTime(5, 0)}
          disabled={isStopwatch}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-all duration-300 ${isStopwatch ? "pointer-events-none opacity-25" : "hover:bg-neutral-700 hover:text-neutral-100"}`}
        >
          5M
        </button>
        <button
          onClick={() => handleSetTime(1, 0)}
          disabled={isStopwatch}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-all duration-300 ${isStopwatch ? "pointer-events-none opacity-25" : "hover:bg-neutral-700 hover:text-neutral-100"}`}
        >
          1M
        </button>
        <button
          onClick={() => handleSetTime(0, 1)}
          disabled={isStopwatch}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-all duration-300 ${isStopwatch ? "pointer-events-none opacity-25" : "hover:bg-neutral-700 hover:text-neutral-100"}`}
        >
          1S
        </button>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsStopwatch((prev) => !prev)}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-sm transition-colors duration-300 hover:bg-neutral-700 hover:text-neutral-100 ${isStopwatch ? "bg-neutral-700 text-neutral-100" : "bg-white text-neutral-800"}`}
        >
          <Stopwatch size={"20px"} />
        </button>
        <button
          onClick={handleReset}
          className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-colors duration-300 hover:bg-neutral-700 hover:text-neutral-100"
        >
          <Reset size={"20px"} />
        </button>
        <button
          onClick={handleStartPause}
          className="flex h-12 w-28 items-center justify-center rounded-full border-[1.5px] border-neutral-700 bg-neutral-700 text-white transition-colors duration-300 hover:bg-neutral-900"
        >
          <PlayPause size={"30px"} />
        </button>
      </div>

      <div className={`absolute right-3 top-2`}>
        <MinimizeWidget widgetId="Timer" />
      </div>
    </div>
  );
};

export default Timer;
