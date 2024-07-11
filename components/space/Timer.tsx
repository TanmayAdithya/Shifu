import React from "react";

type Props = { openTimerWidget: boolean };

const Timer = ({ openTimerWidget }: Props) => {
  return (
    <div
      className={`${openTimerWidget ? "" : "hidden"} absolute bottom-80 right-[35rem]`}
    ></div>
  );
};

export default Timer;
