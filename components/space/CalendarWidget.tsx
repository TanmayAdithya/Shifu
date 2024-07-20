import { useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { FiChevronsLeft } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";
import { IoMdClose as Close } from "react-icons/io";
import { MdModeEdit as EditEvent } from "react-icons/md";
import { PiTrashSimpleBold as DeleteEvent } from "react-icons/pi";
// import { EventProps } from "@/types/types";

type Props = {
  openCalendarWidget: boolean;
};

const CalendarWidget = ({ openCalendarWidget }: Props) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear(),
  );

  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
  const [showEventPopup, setShowEventPopup] = useState<boolean>(false);
  // const [events, setEvents] = useState<EventProps[]>([]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear,
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear,
    );
  };
  const prevYear = () => {
    setCurrentYear((prevYear) => prevYear - 1);
  };

  const nextYear = () => {
    setCurrentYear((prevYear) => prevYear + 1);
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);

    if (clickedDate >= currentDate) {
      setSelectedDate(clickedDate);
      setShowEventPopup((prev) => !prev);
    }
  };

  return (
    <div
      className={`${openCalendarWidget ? "" : "hidden"} absolute bottom-[10.5rem] z-10 flex aspect-[3/2] w-[34rem] justify-between gap-4 rounded-lg bg-white p-5 shadow-lg`}
    >
      <div className="w-full">
        <h1 className="text-xl text-neutral-800">Calendar</h1>
        <div className="my-3 flex items-center justify-between gap-2">
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-1">
              <i>
                <FiChevronsLeft
                  className="cursor-pointer rounded bg-neutral-100 text-neutral-700 transition-colors duration-150 hover:bg-neutral-200 hover:text-neutral-800"
                  size={"20px"}
                  onClick={() => prevYear()}
                />
              </i>
              <i>
                <MdChevronLeft
                  className="cursor-pointer rounded bg-neutral-100 text-neutral-700 transition-colors duration-150 hover:bg-neutral-200 hover:text-neutral-800"
                  size={"20px"}
                  onClick={() => prevMonth()}
                />
              </i>
            </div>
            <h2 className="text-neutral-800">
              {monthsOfYear[currentMonth]}, {currentYear}
            </h2>
            <div className="flex gap-1">
              <i>
                <MdChevronRight
                  className="cursor-pointer rounded bg-neutral-100 text-neutral-700 transition-colors duration-150 hover:bg-neutral-200 hover:text-neutral-800"
                  size={"20px"}
                  onClick={() => nextMonth()}
                />
              </i>
              <i>
                <FiChevronsRight
                  className="cursor-pointer rounded bg-neutral-100 text-neutral-700 transition-colors duration-150 hover:bg-neutral-200 hover:text-neutral-800"
                  size={"20px"}
                  onClick={() => nextYear()}
                />
              </i>
            </div>
          </div>
        </div>
        <div className="my-2 flex w-full justify-between">
          {daysOfWeek.map((day) => (
            <span
              key={day}
              className="w-[calc(100% / 7)] flex justify-center text-sm font-semibold text-neutral-800"
            >
              {day}
            </span>
          ))}
        </div>
        <div className="days">
          {Array.from(Array(firstDayOfMonth).keys()).map((_, index) => (
            <span className="pointer-events-none" key={`empty-${index}`} />
          ))}
          {Array.from(Array(daysInMonth).keys()).map((day) => (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "rounded-full bg-neutral-800 text-neutral-50"
                  : ""
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="h-full w-full overflow-y-auto rounded">
        {showEventPopup && (
          <div className="flex aspect-[10/9] w-full flex-col justify-between rounded border border-neutral-200/40 bg-neutral-200/60 p-3">
            <h1 className="mb-2 text-center font-semibold">Event</h1>
            <div className="time-input">
              <p className="mb-2 text-neutral-800">Time</p>
              <div className="mb-4 flex gap-1">
                <select
                  name="hours"
                  className="rounded-md bg-neutral-800 p-1 text-center text-xs text-white"
                >
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
                <select
                  name="minutes"
                  className="rounded-md bg-neutral-800 p-1 text-center text-xs text-white"
                >
                  {minutes.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
                <select
                  name="period"
                  className="rounded-md bg-neutral-800 p-1 text-center text-xs text-white"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            <p className="mb-2 text-neutral-800">Details</p>
            <textarea
              className="mb-4 resize-none rounded"
              placeholder=""
            ></textarea>
            <button className="cursor-pointer rounded bg-neutral-800 text-white">
              Add Event
            </button>
            <button
              className="absolute right-6 top-6"
              onClick={() => setShowEventPopup(false)}
            >
              <Close className="text-neutral-700" />
            </button>
          </div>
        )}
        {/* {events.map((event, index) => (
          <div className="h-full overflow-y-auto" key={index}>
            <div className="event-date-wrapper">
              <div className="event-date">{`${
                monthsOfYear[event.date.getMonth()]
              } ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
              <div className="event-time">{event.time}</div>
            </div>
            <div className="event-text">{event.text}</div>
            <div className="event-buttons">
              <i
                className="bx bxs-edit-alt"
                onClick={() => handleEditEvent(event)}
              ></i>
              <i
                className="bx bxs-message-alt-x"
                onClick={() => handleDeleteEvent(event.id)}
              ></i>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default CalendarWidget;
