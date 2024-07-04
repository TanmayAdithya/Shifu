import { TimerProps } from "@/types/types";
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

type Props = { openTimerWidget: boolean };

const Timer = ({ openTimerWidget }: Props) => {
  const [newTimer, setNewTimer] = useState<TimerProps>({
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900,
  });
  let percentage = 60;

  return (
    <div
      className={`${openTimerWidget ? "" : "hidden"} absolute bottom-80 right-[35rem]`}
    >
      <div className="mb-5 flex justify-center gap-2">
        <button
          // onClick={() => handleTimeSet(5)}
          className="rounded-xl bg-white/90 px-4 py-2 text-sm text-black"
        >
          5 mins
        </button>
        <button
          // onClick={() => handleTimeSet(10)}
          className="rounded-xl bg-white/90 px-4 py-2 text-sm text-black"
        >
          10 mins
        </button>
        <button
          // onClick={() => handleTimeSet(20)}
          className="rounded-xl bg-white/90 px-4 py-2 text-sm text-black"
        >
          20 mins
        </button>
      </div>
      <div className="flex h-[10rem] w-80 min-w-[192px] justify-between rounded-[2.5rem] bg-white p-2 shadow-lg">
        <div className="flex flex-1 flex-col justify-between p-4">
          <h3>Timer</h3>
          <h1 className="text-5xl">25:00</h1>
          <button className="w-fit rounded-xl bg-gray-300 px-3 py-1 text-sm text-black">
            Start
          </button>
        </div>
        <div className="flex h-full w-full max-w-[9.25rem] items-center justify-center rounded-[2rem] bg-blue-500">
          <CountdownCircleTimer
            isPlaying
            duration={60}
            colors={["#fafafa", "#fafafa"]}
            colorsTime={[60, 0]}
            size={120}
            trailColor="#1e40af"
            strokeWidth={10}
          >
            {({ remainingTime }) => {
              const minutes = Math.floor(remainingTime / 60);
              const seconds = remainingTime % 60;

              return (
                <>
                  <span className="text-2xl text-white">
                    {minutes < 10 ? "0" + minutes : minutes}:
                    {seconds < 10 ? "0" + seconds : seconds}
                  </span>
                </>
              );
            }}
          </CountdownCircleTimer>
        </div>
      </div>
    </div>
  );
};

export default Timer;
