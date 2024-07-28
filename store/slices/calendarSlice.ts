import { AddEventProps, CalendarEvent, EventDetails } from "@/types/types";
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

const initialState: { calendarEvents: CalendarEvent[] } = {
  calendarEvents: [
    {
      id: "Sat Jul 27 2024",
      events: [
        {
          id: "1",
          details: {
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
    {
      id: "Sun Jul 28 2024",
      events: [
        {
          id: "1",
          details: {
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
            title: "Product Pitch",
          },
        },
      ],
    },
    {
      id: "Mon Jul 29 2024",
      events: [
        {
          id: "1",
          details: {
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
            title: "Sprint Planning",
          },
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
      const event = state.calendarEvents.find(
        (event) => event.id === action.payload.dateId,
      );
      if (event) {
        event.events.push({
          id: nanoid(),
          details: {
            time: {
              start: action.payload.time?.start && {
                hours: action.payload.time.start.hours ?? 0,
                minutes: action.payload.time.start.minutes ?? 0,
                period: action.payload.time.start.period ?? "AM",
              },
              end: action.payload.time?.end && {
                hours: action.payload.time.end.hours ?? 0,
                minutes: action.payload.time.end.minutes ?? 0,
                period: action.payload.time.end.period ?? "AM",
              },
            },
            title: action.payload.title,
          },
        });
      }
    },
    updateEvent: (state, action: PayloadAction<EventDetails>) => {},
    removeEvent: (state, action: PayloadAction<string>) => {
      //   for (const calendarEvent of state.calendarEvents) {
      //     calendarEvent.events = calendarEvent.events.filter(
      //       (event) => event.id !== action.payload,
      //     );
      //   }
    },
  },
});

export const { addEvent, updateEvent, removeEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
