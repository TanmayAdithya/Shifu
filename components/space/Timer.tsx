import React from "react";
import { useTimer } from "react-timer-hook";

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
    <div className="flex flex-col">
      <h3>Timer</h3>
      <div>
        <span>{hours > 0 && (hours < 10 ? "0" + hours : hours)}</span>:
        <span>{minutes < 10 ? "0" + minutes : minutes}</span>:
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <div className="flex flex-wrap gap-3">
        <button
          className="mr-2 rounded-full bg-blue-400 px-3 py-1 text-emerald-50 transition-colors duration-100 hover:bg-blue-600"
          onClick={start}
        >
          Start
        </button>
        <button
          className="mr-2 rounded-full bg-blue-400 px-3 py-1 text-emerald-50 transition-colors duration-100 hover:bg-blue-600"
          onClick={pause}
        >
          Pause
        </button>
        <button
          className="mr-2 rounded-full bg-blue-400 px-3 py-1 text-emerald-50 transition-colors duration-100 hover:bg-blue-600"
          onClick={resume}
        >
          Resume
        </button>
        <button
          className="mr-2 rounded-full bg-blue-400 px-3 py-1 text-emerald-50 transition-colors duration-100 hover:bg-blue-600"
          onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + 300);
            restart(time);
          }}
        >
          Restart
        </button>
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
