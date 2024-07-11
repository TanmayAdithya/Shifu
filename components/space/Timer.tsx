import React, { useState } from "react";
import MinimizeWidget from "./MinimizeWidget";
import { TimerProps } from "@/types/types";
import { FaPlus as Add } from "react-icons/fa";
import { FaMinus as Minus } from "react-icons/fa";

type Props = { openTimerWidget: boolean };

// start/stop
//pause
//reset
//mode
//

const Timer = ({ openTimerWidget }: Props) => {
  const [time, setTime] = useState<TimerProps>({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  function startTimer() {}

  return (
    <div
      className={`${openTimerWidget ? "" : "hidden"} absolute bottom-80 right-[35rem] aspect-square w-72 rounded-3xl bg-white p-7`}
    >
      <div className="mb-4 rounded-xl border border-neutral-300 bg-neutral-200/60 text-center">
        <span className="pointer-events-none text-8xl tracking-tighter text-neutral-700">
          00
        </span>
        <span className="pointer-events-none text-5xl tracking-tighter text-neutral-700">
          00
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-center text-lg text-neutral-700">MIN</h3>
          <div>
            <button className="mr-1 rounded-s-full bg-neutral-500 p-2 text-neutral-200 transition-colors duration-300 hover:bg-neutral-600 hover:text-neutral-100">
              <Add size={"10px"} className="text-neutral-100" />
            </button>
            <button className="rounded-e-full bg-neutral-500 p-2 text-neutral-200 transition-colors duration-300 hover:bg-neutral-600 hover:text-neutral-100">
              <Minus size={"10px"} className="text-neutral-100" />
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-center text-lg text-neutral-700">SEC</h3>
          <div>
            <button className="mr-1 rounded-s-full bg-neutral-500 p-2 text-neutral-200 transition-colors duration-300 hover:bg-neutral-600 hover:text-neutral-100">
              <Add size={"10px"} className="text-neutral-100" />
            </button>
            <button className="rounded-e-full bg-neutral-500 p-2 text-neutral-200 transition-colors duration-300 hover:bg-neutral-600 hover:text-neutral-100">
              <Minus size={"10px"} className="text-neutral-100" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
        <button></button>
      </div>

      <div className={`absolute right-3 top-2`}>
        <MinimizeWidget widgetId="Timer" />
      </div>
    </div>
  );
};

export default Timer;
