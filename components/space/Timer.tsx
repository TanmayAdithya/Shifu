import React, { useEffect, useRef, useState } from "react";
import MinimizeWidget from "./MinimizeWidget";
import { PiPlayPauseFill as PlayPause } from "react-icons/pi";
import { GrPowerReset as Reset } from "react-icons/gr";
import { GoStopwatch as Stopwatch } from "react-icons/go";

type Props = { openTimerWidget: boolean };

const Timer = ({ openTimerWidget }: Props) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [stopwatchRunning, setStopwatchRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const stopwatchRef = useRef<NodeJS.Timeout | null>(null);

  const incrementSeconds = (amount: number) =>
    setSeconds((prev) => (prev + amount) % 60);
  const incrementMinutes = (amount: number) =>
    setMinutes((prev) => (prev + amount) % 60);

  const handleAddTime = (amount: number, type: "SEC" | "MIN") => {
    if (type === "SEC") {
      incrementSeconds(amount);
    } else {
      incrementMinutes(amount);
    }
  };

  useEffect(() => {
    if (stopwatchRunning) {
      stopwatchRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          } else {
            return prevSeconds + 1;
          }
        });
      }, 1000);
    } else if (stopwatchRef.current) {
      clearInterval(stopwatchRef.current);
      stopwatchRef.current = null;
    }

    return () => {
      if (stopwatchRef.current) {
        clearInterval(stopwatchRef.current);
        stopwatchRef.current = null;
      }
    };
  }, [stopwatchRunning]);

  const handleStartTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            if (minutes === 0) {
              clearInterval(timerRef.current!);
              setTimerRunning(false);
              return 0;
            } else {
              setMinutes((m) => (m > 1 ? m - 1 : 0));
              return 59;
            }
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current!);
      setTimerRunning(false);
    }
  };

  const handleReset = () => {
    clearInterval(stopwatchRef.current!);
    clearInterval(timerRef.current!);
    setStopwatchRunning(false);
    setTimerRunning(false);
    setSeconds(0);
    setMinutes(0);
  };

  return (
    <div
      className={`${openTimerWidget ? "" : "hidden"} absolute bottom-80 right-[35rem] aspect-square w-72 rounded-3xl bg-white p-7`}
    >
      <div className="relative mb-6 rounded-xl border border-neutral-300 bg-neutral-200/60 text-center">
        <div className="pointer-events-none absolute left-[60%] top-1 select-none text-xs text-neutral-600">
          M
        </div>
        <div className="pointer-events-none absolute bottom-10 right-[10%] select-none text-xs text-neutral-600">
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
          onClick={() => handleAddTime(10, "MIN")}
          disabled={stopwatchRunning}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-colors duration-300 ${stopwatchRunning ? "pointer-events-none opacity-25" : "hover:bg-neutral-700 hover:text-neutral-100"}`}
        >
          10M
        </button>
        <button
          onClick={() => handleAddTime(5, "MIN")}
          disabled={stopwatchRunning}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-colors duration-300 ${stopwatchRunning ? "pointer-events-none opacity-25" : "hover:bg-neutral-700 hover:text-neutral-100"}`}
        >
          5M
        </button>
        <button
          onClick={() => handleAddTime(1, "MIN")}
          disabled={stopwatchRunning}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-colors duration-300 ${stopwatchRunning ? "pointer-events-none opacity-25" : "hover:bg-neutral-700 hover:text-neutral-100"}`}
        >
          1M
        </button>
        <button
          onClick={() => handleAddTime(1, "SEC")}
          disabled={stopwatchRunning}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-colors duration-300 ${stopwatchRunning ? "pointer-events-none opacity-25" : "hover:bg-neutral-700 hover:text-neutral-100"}`}
        >
          1S
        </button>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-sm text-neutral-800 transition-colors duration-300 hover:bg-neutral-700 hover:text-neutral-100"
          onClick={() => setStopwatchRunning((prev) => !prev)}
        >
          <Stopwatch size={"20px"} />
        </button>
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-colors duration-300 hover:bg-neutral-700 hover:text-neutral-100"
          onClick={handleReset}
        >
          <Reset size={"20px"} />
        </button>
        <button
          className="flex h-12 w-28 items-center justify-center rounded-full border-[1.5px] border-neutral-700 bg-neutral-700 text-white transition-colors duration-300 hover:bg-neutral-900"
          onClick={handleStartTimer}
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
