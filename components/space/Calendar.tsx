import React from "react";

type Props = {
  openCalendarWidget: boolean;
};

const Calendar = ({ openCalendarWidget }: Props) => {
  return (
    <div className={`${openCalendarWidget ? "" : "hidden"}`}>Calendar</div>
  );
};

export default Calendar;
