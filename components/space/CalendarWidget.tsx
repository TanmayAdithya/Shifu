import React, { useState } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdModeEdit as EditEvent,
} from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import {
  PiTrashSimpleBold as DeleteEvent,
  PiPlus as NewEvent,
} from "react-icons/pi";
import { LuLayoutList as EventsListIcon } from "react-icons/lu";
import { FiCalendar as CalendarIcon } from "react-icons/fi";
import { AddEventProps, CalendarEvent, Tab } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { DatePickerWithPresets } from "../ui/datepicker";
import { IoClose, IoLinkOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import MinimizeWidget from "./MinimizeWidget";
import { addEvent } from "@/store/slices/calendarSlice";

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
      className={`${openCalendarWidget ? "" : "hidden"} absolute bottom-[8.5rem] z-10 flex max-h-[22rem] w-[20rem] justify-between gap-4 rounded-xl bg-white px-5 pb-5 pt-6 shadow-lg`}
    >
      <div className="w-full">
        <div className="mb-4 flex gap-1">
          {tabs.map((tab) => (
            <div
              key={tab.label}
              className={`flex flex-1 cursor-pointer items-center justify-center rounded-md border border-neutral-300 px-2 py-1 transition-colors duration-300 hover:border-neutral-600 hover:bg-neutral-600 hover:text-neutral-50 ${activeTab === tab.label ? "border-neutral-800 bg-neutral-800 text-neutral-50 hover:border-neutral-800 hover:bg-neutral-800" : ""}`}
              onClick={() => handleTabClick(tab.label)}
            >
              <div className="flex items-center justify-center gap-2">
                <span>{tab.icon}</span>
                {tab.label}
              </div>
            </div>
          ))}
        </div>
        <div className="h-full">
          {tabs.map((tab) => (
            <div
              key={tab.label}
              className={`tab-panel ${activeTab === tab.label ? "active" : ""}`}
            >
              {activeTab === tab.label && (
                <div className="h-full">{tab.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute right-2 top-1">
        <MinimizeWidget widgetId="Calendar" />
      </div>
    </div>
  );
};

export default CalendarWidget;

export const Events: React.FC<CalendarComponentProps> = ({
  calendarEvents,
  currentDate,
}) => {
  const [showEventPopup, setShowEventPopup] = useState<boolean>(false);

  const openPopup = () => {
    setShowEventPopup(true);
  };

  const closePopup = () => {
    setShowEventPopup(false);
  };

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
    <div className="mb-1 h-full max-h-full w-full rounded">
      <div
        className="mb-4 flex w-fit cursor-pointer items-center rounded bg-neutral-800 px-2 py-1 text-sm text-neutral-100 hover:bg-neutral-900"
        onClick={() => openPopup()}
      >
        <span>
          <NewEvent className="mr-1 text-white" size={"16px"} />
        </span>
        New Event
      </div>
      <div className="flex max-h-[14rem] w-full flex-col gap-2 overflow-y-auto rounded">
        {calendarEvents.map((day, i) => {
          const dateArr = day.dateId.split(" ");

          return (
            <div key={i} className="flex w-full flex-col gap-2">
              <div className="sticky top-0 flex items-center justify-between rounded-md bg-neutral-800 p-2">
                <span className="text-xl font-medium text-neutral-50">
                  {dateArr[2]}{" "}
                  <span className="text-sm font-light text-neutral-50">
                    {dateArr[1]}, {dateArr[0]}
                  </span>
                </span>
                <span className="text-sm text-neutral-300">
                  {day.events.length}
                </span>
              </div>

              <div className="flex w-full flex-col gap-1">
                {day.events.map((event, i) => {
                  return (
                    <div
                      key={i}
                      className="group flex cursor-pointer rounded border border-neutral-200 bg-white p-2 text-neutral-50 transition-colors hover:border-neutral-700 hover:bg-neutral-700"
                    >
                      <span className="mr-2 w-[1.5px] rounded-full bg-neutral-600 group-hover:bg-neutral-100"></span>
                      <div className="flex">
                        <div className="flex flex-col">
                          <div className="flex items-center justify-start">
                            <span className="font-medium text-neutral-900 group-hover:text-neutral-50">
                              {event.details[0].title}
                            </span>
                          </div>
                          {event.details[0].start && event.details[0].end && (
                            <span className="text-xs font-light text-neutral-700/85 group-hover:text-neutral-200">
                              {`${event.details[0].start} ${event.details[0].startPeriod?.toLowerCase()} - ${event.details[0].end} ${event.details[0].endPeriod?.toLowerCase()}`}
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
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {showEventPopup && <EventPopup times={times} closePopup={closePopup} />}
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

  return (
    <div className="h-full max-h-full w-full">
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
          >
            {day + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export const EventPopup: React.FC<{
  times: string[];
  closePopup: () => void;
}> = ({ times, closePopup }) => {
  const dispatch = useDispatch();

  function handleAddEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload: AddEventProps = {
      title: formData.get("title") as string,
      dateId: formData.get("dateId") as string,
      link: formData.get("link") as string,
      start: formData.get("start") as string,
      startPeriod: formData.get("startPeriod") as string,
      end: formData.get("end") as string,
      endPeriod: formData.get("endPeriod") as string,
    };

    dispatch(addEvent(payload));
  }

  return (
    <form
      onSubmit={handleAddEvent}
      className="absolute -right-72 top-2 mb-4 flex flex-col gap-4 rounded-lg bg-white p-5 shadow-md"
    >
      <div className="flex items-center">
        <span className="rounded-s-md border-b border-l border-t border-neutral-200 bg-white py-[2px] pl-4">
          <GoPeople className="h-8 text-neutral-500" size={"18px"} />
        </span>
        {/* Event Title */}
        <input
          className="w-[12.75rem] resize-none rounded-e-md border-b border-r border-t px-2 py-[6px] outline-none placeholder:text-neutral-500"
          placeholder="Add New Event"
          type="text"
          name="title"
          required
        />
      </div>

      <DatePickerWithPresets name="dateId" />

      <div className="flex items-center">
        <span className="rounded-s-md border-b border-l border-t border-neutral-200 bg-white py-[2px] pl-4">
          <IoLinkOutline className="h-8 text-neutral-500" size={"18px"} />
        </span>
        <input
          className="w-[12.75rem] resize-none rounded-e-md border-b border-r border-t px-2 py-[6px] outline-none placeholder:text-neutral-500"
          placeholder="Add Link"
          type="text"
          name="link"
        />
      </div>

      <div className="flex w-[15rem] items-center justify-between rounded-md border border-neutral-200 bg-white">
        <span className="flex items-center rounded-s-md bg-white py-[2px] pl-4">
          <IoMdTime size={"18px"} className="mr-1 text-neutral-500" />
          <p className="text-neutral-500">Start</p>
        </span>
        <div className="flex rounded-e-md bg-white px-2 py-[6px] placeholder:text-neutral-500">
          <select
            name="start"
            className="bg-transparent text-center text-neutral-700"
          >
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <select
            name="startPeriod"
            className="bg-transparent text-center text-neutral-700"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <div className="flex w-[15rem] items-center justify-between rounded-md border border-neutral-200 bg-white">
        <span className="flex items-center rounded-s-md bg-white py-[2px] pl-4">
          <IoMdTime size={"18px"} className="mr-1 text-neutral-500" />
          <p className="text-neutral-500">End</p>
        </span>
        <div className="flex rounded-e-md bg-white px-2 py-[6px] placeholder:text-neutral-500">
          <select
            name="end"
            className="bg-transparent text-center text-neutral-700"
          >
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <select
            name="endPeriod"
            className="bg-transparent text-center text-neutral-700"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <div className="flex gap-1">
        <button
          type="submit"
          className="flex-1 rounded-md bg-neutral-800 px-2 py-1 text-white transition-colors duration-200 hover:bg-neutral-900"
        >
          Add Event
        </button>
        <button
          className="flex-1 rounded-md bg-red-500 px-2 py-1 text-white transition-colors duration-200 hover:bg-red-600"
          onClick={() => closePopup()}
        >
          Cancel
        </button>
      </div>
      <span className="absolute right-1 top-1">
        <IoClose
          className="cursor-pointer text-neutral-600 hover:text-neutral-700"
          onClick={() => closePopup()}
        />
      </span>
    </form>
  );
};
