import { useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { FiChevronsLeft } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";
import { IoMdClose as Close } from "react-icons/io";
import { MdModeEdit as EditEvent } from "react-icons/md";
import { PiTrashSimpleBold as DeleteEvent } from "react-icons/pi";
import { EventProps } from "@/types/types";
import { EventProps2 } from "@/types/types";
import { IoMdTime } from "react-icons/io";

// when you first open the widget, it should show all the events schedules on that day
// if you select any other day it should show the events on the selected day
// and there is a back button to go back to today's events
// selected day events will have add event button and so will today's event
// and when we click add event, another component will show up replacing the events component, after addition it will go back to the events component

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

  const allEvents: EventProps[] = [];

  const exampleEvents: EventProps2[] = [
    {
      id: "Sat Jul 27 2024",
      events: [
        {
          details: {
            id: "1",
            time: {
              start: {
                hours: 9,
                minutes: 30,
                period: "AM",
              },
              end: {
                hours: 10,
                minutes: 30,
                period: "AM",
              },
            },
            title: "Team meeting",
          },
        },
      ],
    },
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

  const [selectedDate, setSelectedDate] = useState<Date | null>(currentDate);
  const [showEventPopup, setShowEventPopup] = useState<boolean>(false);
  const [events, setEvents] = useState<EventProps[]>([]);

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

  function handleDeselect() {
    setSelectedDate(null);
    setShowEventPopup(false);
  }

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    console.log(clickedDate.toDateString());

    if (clickedDate >= currentDate && selectedDate === null) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
    } else {
      handleDeselect();
    }
  };

  return (
    <div
      className={`${openCalendarWidget ? "" : "hidden"} absolute bottom-[10.5rem] z-10 flex aspect-[3/2] w-[34rem] justify-between gap-4 rounded-lg bg-white p-5 shadow-lg`}
    >
      <div className="w-full">
        <h1 className="mb-1 text-neutral-700">Calendar</h1>
        <div className="mb-4 h-[1px] w-full bg-neutral-300"></div>
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
              className={`${
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "duration-50 flex aspect-square cursor-pointer items-center justify-center rounded-full border-0 bg-neutral-800 text-sm text-neutral-50 transition-colors hover:bg-neutral-800"
                  : "duration-50 ease flex aspect-square cursor-pointer items-center justify-center rounded-full border-0 text-sm transition-colors hover:bg-neutral-200"
              } ${selectedDate?.getDate() === day + 1 ? "bg-neutral-200" : ""} `}
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="h-full w-full overflow-y-auto">
        {showEventPopup ? (
          <div className="relative flex aspect-[10/9] w-full flex-col justify-between rounded border-2 border-neutral-200 bg-neutral-100 p-3">
            <h1 className="mb-4 font-semibold text-neutral-700">New Event</h1>
            <div className="mb-4 h-[1px] w-full bg-neutral-300"></div>
            <input
              className="mb-4 resize-none rounded border border-neutral-300 p-1"
              placeholder="Event name"
              type="text"
            ></input>
            <div className="time-input">
              <div className="flex items-start justify-between">
                <div className="mb-2 flex items-center text-neutral-800">
                  <span className="mr-1">
                    <IoMdTime size={"18px"} className="text-neutral-800" />
                  </span>
                  <p>Start</p>
                </div>
                <div className="flex gap-1">
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

              <div className="mb-4 flex items-start justify-between">
                <div className="mb-2 flex items-center text-neutral-800">
                  <span className="mr-1">
                    <IoMdTime size={"18px"} className="text-neutral-800" />
                  </span>
                  <p>End</p>
                </div>
                <div className="flex gap-1">
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
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="cursor-pointer rounded border border-neutral-800 px-2 py-1 text-sm text-neutral-700 transition-colors duration-200 hover:border-red-600 hover:bg-red-600 hover:text-neutral-100"
                onClick={() => handleDeselect()}
              >
                Cancel
              </button>
              <button className="cursor-pointer rounded bg-neutral-800 px-2 py-1 text-sm text-neutral-100 transition-colors duration-200 hover:bg-neutral-950">
                Add Event
              </button>
            </div>
            <button
              className="absolute right-2 top-2"
              onClick={() => handleDeselect()}
            >
              <Close className="text-neutral-700" />
            </button>
          </div>
        ) : (
          <>
            <h1 className="mb-1">Events</h1>
            <div className="mb-4 h-[1px] w-full bg-neutral-300"></div>
            <div className="flex flex-col gap-2">
              {exampleEvents
                .find((event) => event.id === selectedDate?.toDateString())
                ?.events.map((day, index) => (
                  <div
                    key={index}
                    className="group flex cursor-pointer rounded border border-neutral-300/60 bg-neutral-200/30 p-2 text-neutral-50 transition-colors hover:border-neutral-700 hover:bg-neutral-700"
                  >
                    <span className="mr-2 w-[1.25px] rounded-full bg-neutral-600 group-hover:bg-neutral-100"></span>
                    <div className="flex flex-1">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-start">
                          <span className="font-medium text-neutral-900 group-hover:text-neutral-50">
                            {day.details.title}
                          </span>
                        </div>
                        <span className="text-xs font-light text-neutral-700/85 group-hover:text-neutral-200">
                          {`${String(day.details.time.start.hours).padStart(2, "0")}:${String(day.details.time.start.minutes).padStart(2, "0")}
                     ${day.details.time.start.period.toLowerCase()} - ${String(day.details.time.end.hours).padStart(2, "0")}:${String(day.details.time.end.minutes).padStart(2, "0")}
                     ${day.details.time.end.period.toLowerCase()}`}
                        </span>
                      </div>
                      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform flex-col space-y-4">
                        <i
                          className="bx bxs-edit-alt"
                          // onClick={() => handleEditEvent(event)}
                        ></i>
                        <i
                          className="bx bxs-message-alt-x"
                          // onClick={() => handleDeleteEvent(event.id)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;
