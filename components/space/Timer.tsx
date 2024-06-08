import React from "react";
import { useTimer } from "react-timer-hook";
import { FaPlay as Start } from "react-icons/fa6";
import { FaPause as Pause } from "react-icons/fa6";
import { VscDebugRestart as Restart } from "react-icons/vsc";

type Props = {
  expiryTimestamp: Date;
};

function MyTimer({ expiryTimestamp }: Props) {
  const { seconds, minutes, hours, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => console.warn("onExpire called"),
      autoStart: false,
    });

  return (
    <div className="flex w-full flex-col justify-between">
      <div className="flex w-full">
        <div className="flex flex-1 flex-grow cursor-pointer items-center justify-center rounded-l-lg border-y border-l border-neutral-200 bg-neutral-50 px-3 py-2 transition-colors duration-100 hover:bg-neutral-100">
          Timer
        </div>
        <div className="flex flex-1 flex-grow cursor-pointer items-center justify-center rounded-r-lg border border-neutral-200 bg-neutral-50 px-3 py-2 transition-colors duration-100 hover:bg-neutral-100">
          Stopwatch
        </div>
      </div>
      <div className="flex items-center justify-center text-5xl font-light">
        <span>{hours > 0 && (hours < 10 ? "0" + hours : hours)}</span>:
        <span>{minutes < 10 ? "0" + minutes : minutes}</span>:
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </div>
      {/* <p>{isRunning ? "Running" : "Not running"}</p> */}
      <div className="flex flex-wrap justify-center gap-3">
        <span
          className="mr-2 flex cursor-pointer items-center justify-center rounded-full bg-neutral-600 p-3 text-emerald-50 transition-colors duration-100 hover:bg-neutral-800"
          onClick={start}
        >
          <Start size={"20px"} />
        </span>
        <span
          className="mr-2 flex cursor-pointer items-center justify-center rounded-full bg-neutral-600 p-3 text-emerald-50 transition-colors duration-100 hover:bg-neutral-800"
          onClick={pause}
        >
          <Pause size={"20px"} />
        </span>

        <span
          className="mr-2 flex cursor-pointer items-center justify-center rounded-full bg-neutral-600 p-3 text-emerald-50 transition-colors duration-100 hover:bg-neutral-800"
          onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + 300);
            restart(time);
          }}
        >
          <Restart size={"20px"} />
        </span>
      </div>
    </div>
  );
}

const Timer = (props: Props) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 3600);
  return (
    <div className="absolute right-56 top-20 flex h-[15rem] w-80 min-w-[192px] rounded-xl bg-white p-4 shadow-lg">
      <MyTimer expiryTimestamp={time} />
    </div>
  );
};

export default Timer;
