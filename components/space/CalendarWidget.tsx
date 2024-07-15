import { useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { IoMdClose as Close } from "react-icons/io";
import { MdModeEdit as EditEvent } from "react-icons/md";
import { PiTrashSimpleBold as DeleteEvent } from "react-icons/pi";

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

  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear(),
  );

  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
  const [showEventPopup, setShowEventPopup] = useState<boolean>(false);

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

  return (
    <div
      className={`${openCalendarWidget ? "" : "hidden"} absolute bottom-[10.5rem] z-10 flex aspect-[3/2] w-[34rem] justify-between gap-4 rounded-lg bg-white p-5 shadow-lg`}
    >
      <div className="w-full">
        <h1 className="text-xl text-neutral-800">Calendar</h1>
        <div className="my-3 flex items-center justify-between gap-2">
          <h2 className="text-neutral-800">
            {monthsOfYear[currentMonth]}, {currentYear}
          </h2>

          <div className="flex gap-1">
            <i>
              <MdChevronLeft
                className="cursor-pointer rounded bg-neutral-100 text-neutral-700 transition-colors duration-150 hover:bg-neutral-200 hover:text-neutral-800"
                size={"20px"}
                onClick={() => prevMonth()}
              />
            </i>
            <i>
              <MdChevronRight
                className="cursor-pointer rounded bg-neutral-100 text-neutral-700 transition-colors duration-150 hover:bg-neutral-200 hover:text-neutral-800"
                size={"20px"}
                onClick={() => nextMonth()}
              />
            </i>
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
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="h-full w-full overflow-y-auto rounded bg-neutral-100">
        {showEventPopup && (
          <div className="event-popup">
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
              />
            </div>
            <textarea placeholder="Enter event details"></textarea>
            <button className="event-popup-btn">Add Event</button>
            <button
              className="close-event-popup"
              onClick={() => setShowEventPopup(false)}
            >
              <i>
                <Close />
              </i>
            </button>
          </div>
        )}
        {/* {events.map((event, index) => (
          <div className="event" key={index}>
            <div className="event-date-wrapper">
              <div className="event-date">{`${
                monthsOfYear[event.date.getMonth()]
              } ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
              <div className="event-time">{event.time}</div>
            </div>
            <div className="event-text">{event.text}</div>
            <div className="event-buttons">
              <i className="bx bxs-edit-alt" onClick={() => handleEditEvent(event)}></i>
              <i className="bx bxs-message-alt-x" onClick={() => handleDeleteEvent(event.id)}></i>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default CalendarWidget;
