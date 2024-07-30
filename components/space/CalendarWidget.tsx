import React, { useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { FiChevronsLeft } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";
import { IoMdClose as Close } from "react-icons/io";
import { MdModeEdit as EditEvent } from "react-icons/md";
import { PiTrashSimpleBold as DeleteEvent } from "react-icons/pi";
import { CalendarEvent, Tab, TabsProps } from "@/types/types";
import { IoMdTime } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { PiPlusLight as AddEvent } from "react-icons/pi";

// and there is a back button to go back to today's events
// selected day events will have add event button and so will today's event
// and when we click add event, another component will show up replacing the events component, after addition it will go back to the events component
// clicking other dates should check if there is previously selected date and then deselect it and select the current one

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
      content: (
        <Calendar calendarEvents={calendarEvents} currentDate={currentDate} />
      ),
    },
    {
      label: "Events",
      content: (
        <Events calendarEvents={calendarEvents} currentDate={currentDate} />
      ),
    },
  ];

  return (
    <div
      className={`${openCalendarWidget ? "" : "hidden"} absolute bottom-[8.5rem] z-10 flex max-h-[21.75rem] w-[20rem] justify-between gap-4 rounded-xl bg-white p-5 shadow-lg`}
    >
      <div className="w-full">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default CalendarWidget;

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);

  const handleTabClick = (label: string) => {
    setActiveTab(label);
  };

  return (
    <>
      <div className="mb-2 flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`flex-1 rounded border border-neutral-300 px-2 py-1 transition-colors duration-300 hover:bg-neutral-700 hover:text-neutral-50 ${activeTab === tab.label ? "active" : ""}`}
            onClick={() => handleTabClick(tab.label)}
          >
            {tab.label}
          </button>
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
    </>
  );
};

export const Events: React.FC<CalendarComponentProps> = ({
  calendarEvents,
  currentDate,
}) => {
  const [showEventPopup, setShowEventPopup] = useState<boolean>(false);

  return (
    <div className="w-full">
      <div className="mb-2 flex w-fit cursor-pointer items-center rounded bg-neutral-700 px-2 py-1 text-sm text-neutral-100 hover:bg-neutral-800">
        <span>
          <AddEvent className="text-neutral-100" size={"16px"} />
        </span>
        Add Event
      </div>
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
  const prevYear = () => {
    setCurrentYear((prevYear) => prevYear - 1);
  };

  const nextYear = () => {
    setCurrentYear((prevYear) => prevYear + 1);
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
      <div className="my-3 flex items-center justify-between gap-2">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-1">
            <i>
              <FiChevronsLeft
                className="cursor-pointer rounded border border-neutral-300 text-neutral-800 transition-colors duration-150 hover:bg-neutral-200 hover:text-neutral-800"
                size={"20px"}
                onClick={() => prevYear()}
              />
            </i>
            <i>
              <MdChevronLeft
                className="cursor-pointer rounded border border-neutral-300 text-neutral-800 transition-colors duration-150 hover:bg-neutral-200 hover:text-neutral-800"
                size={"20px"}
                onClick={() => prevMonth()}
              />
            </i>
          </div>
          <h2 className="font-bold text-neutral-800/90">
            {monthsOfYear[currentMonth]} {currentYear}
          </h2>
          <div className="flex gap-1">
            <i>
              <MdChevronRight
                className="cursor-pointer rounded border border-neutral-300 text-neutral-800 transition-colors duration-150 hover:bg-neutral-200 hover:text-neutral-800"
                size={"20px"}
                onClick={() => nextMonth()}
              />
            </i>
            <i>
              <FiChevronsRight
                className="cursor-pointer rounded border border-neutral-300 text-neutral-800 transition-colors duration-150 hover:bg-neutral-200 hover:text-neutral-800"
                size={"20px"}
                onClick={() => nextYear()}
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
