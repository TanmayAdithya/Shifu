import React, { useState } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdModeEdit as EditEvent,
} from "react-icons/md";
import { IoMdClose as Close, IoMdTime } from "react-icons/io";
import {
  PiTrashSimpleBold as DeleteEvent,
  PiPlus as NewEvent,
} from "react-icons/pi";
import { LuLayoutList as EventsListIcon } from "react-icons/lu";
import { FiCalendar as CalendarIcon } from "react-icons/fi";
import { CalendarEvent, Tab, TabsProps } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";

type Props = {
  openCalendarWidget: boolean;
};

interface CalendarComponentProps {
  calendarEvents: CalendarEvent[];
  currentDate: Date;
}

const CalendarWidget = ({ openCalendarWidget }: Props) => {
  const calendarEvents = useSelector(
    (state: RootState) => state.calendar.calendarEvents,
  );

  const currentDate = new Date();

  const tabs: Tab[] = [
    {
      label: "Calendar",
      icon: <CalendarIcon />,
      content: (
        <Calendar calendarEvents={calendarEvents} currentDate={currentDate} />
      ),
    },
    {
      label: "Events",
      icon: <EventsListIcon />,
      content: (
        <Events calendarEvents={calendarEvents} currentDate={currentDate} />
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);

  const handleTabClick = (label: string) => {
    setActiveTab(label);
  };

  return (
    <div
      className={`${openCalendarWidget ? "" : "hidden"} absolute bottom-[8.5rem] z-10 flex max-h-[22rem] w-[20rem] justify-between gap-4 rounded-xl bg-white p-5 shadow-lg`}
    >
      <div className="w-full">
        <div className="mb-4 flex gap-1">
          {tabs.map((tab) => (
            <div
              key={tab.label}
              className={`flex flex-1 cursor-pointer items-center justify-center rounded-md border border-neutral-300 px-2 py-1 transition-colors duration-300 hover:bg-neutral-600 hover:text-neutral-50 ${activeTab === tab.label ? "border-0 bg-neutral-800 text-neutral-50" : ""}`}
              onClick={() => handleTabClick(tab.label)}
            >
              <div className="flex items-center justify-center gap-2">
                <span>{tab.icon}</span>
                {tab.label}
              </div>
            </div>
          ))}
        </div>
        <div className="tab-content">
          {tabs.map((tab) => (
            <div
              key={tab.label}
              className={`tab-panel ${activeTab === tab.label ? "active" : ""}`}
            >
              {activeTab === tab.label && tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;

export const Events: React.FC<CalendarComponentProps> = ({
  calendarEvents,
  currentDate,
}) => {
  const [showEventPopup, setShowEventPopup] = useState<boolean>(true);

  const times = [
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "1:00",
    "1:15",
    "1:30",
    "1:45",
    "2:00",
    "2:15",
    "2:30",
    "2:45",
    "3:00",
    "3:15",
    "3:30",
    "3:45",
    "4:00",
    "4:15",
    "4:30",
    "4:45",
    "5:00",
    "5:15",
    "5:30",
    "5:45",
    "6:00",
    "6:15",
    "6:30",
    "6:45",
    "7:00",
    "7:15",
    "7:30",
    "7:45",
    "8:00",
    "8:15",
    "8:30",
    "8:45",
    "9:00",
    "9:15",
    "9:30",
    "9:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
  ];

  return (
    <div className="max-h-[16rem] w-full overflow-auto rounded">
      <div className="mb-4 flex w-fit cursor-pointer items-center rounded bg-neutral-800 px-2 py-1 text-sm text-neutral-100 hover:bg-neutral-900">
        <span>
          <NewEvent className="mr-1 text-white" size={"16px"} />
        </span>
        New Event
      </div>
      {showEventPopup && (
        <div className="relative flex aspect-[10/9] w-full flex-col justify-between rounded-lg border-2 border-neutral-200 bg-neutral-100 p-4">
          <input
            className="mb-4 resize-none rounded border border-neutral-300 p-1"
            placeholder="Add New Event"
            type="text"
          />
          <input
            className="mb-4 resize-none rounded border border-neutral-300 p-1"
            type="date"
          />
          <input
            className="mb-4 resize-none rounded border border-neutral-300 p-1"
            placeholder="Add Link"
            type="text"
          />
          <div className="time-input">
            <div className="flex items-start justify-between">
              <div className="mb-2 flex items-center text-neutral-800">
                <span className="mr-1">
                  <IoMdTime size={"18px"} className="text-neutral-800" />
                </span>
                <p>Start</p>
              </div>
              <div className="flex">
                <select
                  name="start"
                  className="rounded-s-lg bg-neutral-800 p-1 text-center text-sm text-white"
                >
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <select
                  name="period"
                  className="rounded-e-lg bg-neutral-800 p-1 text-center text-sm text-white"
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
              <div className="flex">
                <select
                  name="end"
                  className="rounded-s-lg bg-neutral-800 p-1 text-center text-sm text-white"
                >
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <select
                  name="period"
                  className="rounded-e-lg bg-neutral-800 p-1 text-center text-sm text-white"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mb-4 h-[1px] w-full bg-neutral-300"></div>
          <div className="mb-4 flex justify-between">
            <button className="duration-50 flex aspect-square cursor-pointer items-center justify-center rounded border-0 p-2 transition-colors hover:bg-neutral-200">
              <Close size={"24px"} className="text-neutral-700" />
            </button>
            <button className="duration-50 flex aspect-square cursor-pointer items-center justify-center rounded border-0 p-2 transition-colors hover:bg-neutral-200">
              <EditEvent size={"24px"} className="text-neutral-700" />
            </button>
            <button className="duration-50 flex aspect-square cursor-pointer items-center justify-center rounded border-0 p-2 transition-colors hover:bg-neutral-200">
              <DeleteEvent size={"24px"} className="text-neutral-700" />
            </button>
          </div>
        </div>
      )}
      <div className="flex max-h-[14rem] flex-col gap-2 overflow-y-auto rounded">
        {calendarEvents
          .find((event) => event.id === currentDate.toDateString())
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
                  {day.details.time &&
                    day.details.time.start &&
                    day.details.time.end && (
                      <span className="text-xs font-light text-neutral-700/85 group-hover:text-neutral-200">
                        {`${String(day.details.time.start.hours).padStart(2, "0")}:${String(day.details.time.start.minutes).padStart(2, "0")}
${day.details.time.start.period.toLowerCase()} - ${String(day.details.time.end.hours).padStart(2, "0")}:${String(day.details.time.end.minutes).padStart(2, "0")}
${day.details.time.end.period.toLowerCase()}`}
                      </span>
                    )}
                </div>
                <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform flex-col space-y-4">
                  <i
                  // edit
                  ></i>
                  <i
                  //delete
                  ></i>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export const Calendar: React.FC<CalendarComponentProps> = ({
  calendarEvents,
  currentDate,
}) => {
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

  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear(),
  );

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

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);

    if (clickedDate >= currentDate) {
      console.log(
        calendarEvents.find((event) => event.id === clickedDate.toDateString()),
      );
    } else {
    }
  };

  return (
    <div className="w-full">
      <div className="my-3 mb-4 flex items-center justify-between gap-2">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-1">
            <i>
              <MdChevronLeft
                className="cursor-pointer rounded border border-neutral-300 text-neutral-800 transition-colors duration-150 hover:border-0 hover:bg-neutral-700 hover:text-neutral-50"
                size={"20px"}
                onClick={() => prevMonth()}
              />
            </i>
          </div>
          <h2 className="font-semibold text-neutral-800/90">
            {monthsOfYear[currentMonth]} {currentYear}
          </h2>
          <div className="flex gap-1">
            <i>
              <MdChevronRight
                className="cursor-pointer rounded border border-neutral-300 text-neutral-800 transition-colors duration-150 hover:border-0 hover:bg-neutral-700 hover:text-neutral-50"
                size={"20px"}
                onClick={() => nextMonth()}
              />
            </i>
          </div>
        </div>
      </div>
      <div className="my-2 grid w-full grid-cols-7 text-center">
        {daysOfWeek.map((day) => (
          <span
            key={day}
            className="text-center text-sm font-medium text-neutral-800"
          >
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from(Array(firstDayOfMonth).keys()).map((_, index) => (
          <span key={`empty-${index}`} className="aspect-square" />
        ))}
        {Array.from(Array(daysInMonth).keys()).map((day) => (
          <span
            key={day + 1}
            className={`${
              day + 1 === currentDate.getDate() &&
              currentMonth === currentDate.getMonth() &&
              currentYear === currentDate.getFullYear()
                ? "flex aspect-square cursor-pointer items-center justify-center rounded-full bg-neutral-800 text-sm text-neutral-50 transition-colors hover:bg-neutral-800"
                : "flex aspect-square cursor-pointer items-center justify-center rounded-full text-sm text-neutral-700 transition-colors hover:bg-neutral-200"
            } text-center`}
            onClick={() => handleDayClick(day + 1)}
          >
            {day + 1}
          </span>
        ))}
      </div>
    </div>
  );
};
