import React from "react";
import { Calendar } from "@/components/ui/calendar";

type Props = {
  openCalendarWidget: boolean;
};

const CalendarWidget = ({ openCalendarWidget }: Props) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div
      className={`${openCalendarWidget ? "" : "hidden"} absolute bottom-[5.5rem] z-10 flex justify-center rounded-lg shadow-lg`}
    >
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border bg-white"
      />
      <div className="ml-2 w-[11.75rem] rounded bg-white"></div>
    </div>
  );
};

export default CalendarWidget;
