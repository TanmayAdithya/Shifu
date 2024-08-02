import {
  AddEventProps,
  CalendarEvent,
  EventDetails,
  Event,
} from "@/types/types";
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

const initialState: { calendarEvents: CalendarEvent[] } = {
  calendarEvents: [
    {
      id: "Thu Aug 01 2024",
      events: [
        {
          id: "1",
          details: [
            {
              title: "Candidate Interview",

              start: "09:30",
              startPeriod: "AM",
              end: "10:30",
              endPeriod: "AM",
            },
          ],
        },
        {
          id: "2",
          details: [
            {
              title: "Client Pitching",
              start: "11:00",
              startPeriod: "AM",
              end: "12:00",
              endPeriod: "PM",
            },
          ],
        },
      ],
    },
    {
      id: "Fri Aug 02 2024",
      events: [
        {
          id: "3",
          details: [
            {
              title: "Project Meeting",
              start: "01:00",
              startPeriod: "PM",
              end: "02:00",
              endPeriod: "PM",
            },
          ],
        },
        {
          id: "4",
          details: [
            {
              title: "Team Standup",
              start: "02:30",
              startPeriod: "PM",
              end: "03:30",
              endPeriod: "PM",
            },
          ],
        },
      ],
    },
  ],
};

export const calendarSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<AddEventProps>) => {
      const calendarEvent = state.calendarEvents.find(
        (event) => event.id === action.payload.dateId,
      );
      if (calendarEvent) {
        const newEvent: Event = {
          id: nanoid(),
          details: [
            {
              title: action.payload.title,
              link: action.payload.link,
              start: action.payload.start,
              startPeriod: action.payload.startPeriod,
              end: action.payload.end,
              endPeriod: action.payload.endPeriod,
            },
          ],
        };
        calendarEvent.events.push(newEvent);
        console.log("hello");
      }
    },
    updateEvent: (state, action: PayloadAction<EventDetails>) => {},
    removeEvent: (state, action: PayloadAction<string>) => {},
  },
});

export const { addEvent, updateEvent, removeEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
