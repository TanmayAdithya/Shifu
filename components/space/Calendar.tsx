import React from "react";

type Props = {
  openCalendarWidget: boolean;
};

const Calendar = ({ openCalendarWidget }: Props) => {
  return (
    <div className={`${openCalendarWidget ? "" : "hidden"} absolute z-10`}>
      Calendar
    </div>
  );
};

export default Calendar;
