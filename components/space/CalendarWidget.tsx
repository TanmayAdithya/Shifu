import { useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { FiChevronsLeft } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";
import { IoMdClose as Close } from "react-icons/io";
import { MdModeEdit as EditEvent } from "react-icons/md";
import { PiTrashSimpleBold as DeleteEvent } from "react-icons/pi";
import { EventProps } from "@/types/types";
import { IoMdTime } from "react-icons/io";

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
  const exampleEvents: EventProps[] = [
    {
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
      details: "Team meeting",
      date: new Date(2024, 5, 27), // June 27, 2024
    },
    {
      id: "2",
      time: {
        start: {
          hours: 11,
          minutes: 0,
          period: "AM",
        },
        end: {
          hours: 12,
          minutes: 0,
          period: "PM",
        },
      },
      details: "Project presentation",
      date: new Date(2024, 5, 27), // June 27, 2024
    },
    {
      id: "3",
      time: {
        start: {
          hours: 1,
          minutes: 15,
          period: "PM",
        },
        end: {
          hours: 2,
          minutes: 0,
          period: "PM",
        },
      },
      details: "Lunch with client",
      date: new Date(2024, 5, 27), // June 27, 2024
    },
    {
      id: "4",
      time: {
        start: {
          hours: 3,
          minutes: 45,
          period: "PM",
        },
        end: {
          hours: 4,
          minutes: 30,
          period: "PM",
        },
      },
      details: "Code review session",
      date: new Date(2024, 5, 27), // June 27, 2024
    },
    {
      id: "5",
      time: {
        start: {
          hours: 6,
          minutes: 0,
          period: "PM",
        },
        end: {
          hours: 7,
          minutes: 0,
          period: "PM",
        },
      },
      details: "Gym workout",
      date: new Date(2024, 5, 27), // June 27, 2024
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

  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
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
      <div className="h-full w-full overflow-y-auto">
        {showEventPopup && (
          <div className="flex aspect-[10/9] w-full flex-col justify-between rounded border border-neutral-200/40 bg-neutral-200/60 p-3">
            <h1 className="mb-2 text-center font-semibold">Event</h1>

            <input
              className="mb-4 resize-none rounded p-1"
              placeholder="Event details"
              type="text"
            ></input>
            <div className="time-input">
              <div className="flex items-start justify-between">
                <p className="mb-2 text-sm text-neutral-800">
                  <span>
                    <IoMdTime />
                  </span>
                  From
                </p>
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
                <p className="mb-2 flex text-sm text-neutral-800">
                  <span>
                    <IoMdTime className="text-neutral-800" />
                  </span>
                  To
                </p>
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
        <h1 className="text-center">Events</h1>
        <div className="flex flex-col gap-2">
          {exampleEvents.map((event, index) => (
            <div className="flex">
              <div className="w-[2px] rounded-full bg-neutral-600"></div>
              <div className="flex flex-1 bg-neutral-200/40" key={index}>
                <div className="flex flex-col p-2">
                  <span className="text-xs text-neutral-800">
                    {`${String(event.time.start.hours).padStart(2, "0")}:${String(event.time.start.minutes).padStart(2, "0")}
                     ${event.time.start.period.toLowerCase()} - ${String(event.time.end.hours).padStart(2, "0")}:${String(event.time.end.minutes).padStart(2, "0")}
                     ${event.time.end.period.toLowerCase()}`}
                  </span>
                  <div className="flex items-center justify-start">
                    <span className="break-words font-medium text-neutral-900">
                      {event.details}
                    </span>
                  </div>
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
      </div>
    </div>
  );
};

export default CalendarWidget;
