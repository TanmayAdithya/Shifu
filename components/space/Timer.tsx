import React from "react";

type Props = {};

const Timer = (props: Props) => {
  return (
    <div className="absolute bottom-32 right-20">
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
      <div className="flex h-[12rem] w-96 min-w-[192px] justify-between rounded-[2.5rem] bg-white p-2 shadow-lg">
        <div className="flex flex-1 flex-col justify-between p-4">
          <h3 className="text-xl">Timer</h3>
          <h1 className="text-6xl">5:00</h1>
          <button className="w-fit rounded-xl bg-gray-300 px-6 py-1 text-lg text-black">
            Stop
          </button>
        </div>
        <div className="h-full w-full max-w-[11.25rem] rounded-[2rem] bg-blue-600"></div>
      </div>
    </div>
  );
};

export default Timer;
