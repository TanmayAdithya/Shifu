import React from "react";
import MinimizeWidget from "./MinimizeWidget";
import { PiPlayPauseFill as PlayPause } from "react-icons/pi";
import { GrPowerReset as Reset } from "react-icons/gr";
import { GoStopwatch as Stopwatch } from "react-icons/go";

type Props = { openTimerWidget: boolean };

const Timer = ({ openTimerWidget }: Props) => {
  return (
    <div
      className={`${openTimerWidget ? "" : "hidden"} absolute bottom-80 right-[35rem] aspect-square w-72 rounded-3xl bg-white p-7`}
    >
      <div className="relative mb-6 rounded-xl border border-neutral-300 bg-neutral-200/60 text-center">
        <div className="pointer-events-none absolute left-[60%] top-1 select-none text-xs text-neutral-500">
          M
        </div>
        <div className="pointer-events-none absolute bottom-10 right-[10%] select-none text-xs text-neutral-500">
          S
        </div>
        <span className="pointer-events-none select-none text-8xl tracking-tighter text-neutral-700">
          00
        </span>
        <span className="pointer-events-none select-none text-5xl tracking-tighter text-neutral-700">
          00
        </span>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <button className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-colors duration-300 hover:bg-neutral-700 hover:text-neutral-100">
          10M
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-colors duration-300 hover:bg-neutral-700 hover:text-neutral-100">
          5M
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-colors duration-300 hover:bg-neutral-700 hover:text-neutral-100">
          1M
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-colors duration-300 hover:bg-neutral-700 hover:text-neutral-100">
          1S
        </button>
      </div>
      <div className="flex items-center justify-between">
        <button className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-sm text-neutral-800 transition-colors duration-300 hover:bg-neutral-700 hover:text-neutral-100">
          <Stopwatch size={"20px"} />
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 text-neutral-800 transition-colors duration-300 hover:bg-neutral-700 hover:text-neutral-100">
          <Reset size={"20px"} />
        </button>
        <button className="flex h-12 w-28 items-center justify-center rounded-full border-[1.5px] border-neutral-700 bg-neutral-700 text-white transition-colors duration-300 hover:bg-neutral-900">
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
