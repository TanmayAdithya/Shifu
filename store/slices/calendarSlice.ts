import { AddEventProps, CalendarEvent, EventDetails } from "@/types/types";
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

const initialState: { calendarEvents: CalendarEvent[] } = {
  calendarEvents: [
    {
      id: "Thu Aug 01 2024",
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
            title: "Candidate Interview",
          },
        },
        {
          id: "2",
          details: {
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
            title: "Client Pitching",
          },
        },
      ],
    },
    {
      id: "Fri Aug 02 2024",
      events: [
        {
          id: "3",
          details: {
            time: {
              start: {
                hours: 1,
                minutes: 0,
                period: "PM",
              },
              end: {
                hours: 2,
                minutes: 0,
                period: "PM",
              },
            },
            title: "Project Meeting",
          },
        },
        {
          id: "4",
          details: {
            time: {
              start: {
                hours: 2,
                minutes: 30,
                period: "PM",
              },
              end: {
                hours: 3,
                minutes: 30,
                period: "PM",
              },
            },
            title: "Team Standup",
          },
        },
      ],
    },
    {
      id: "Sat Aug 03 2024",
      events: [
        {
          id: "5",
          details: {
            time: {
              start: {
                hours: 10,
                minutes: 0,
                period: "AM",
              },
              end: {
                hours: 11,
                minutes: 0,
                period: "AM",
              },
            },
            title: "Strategy Session",
          },
        },
        {
          id: "6",
          details: {
            time: {
              start: {
                hours: 11,
                minutes: 30,
                period: "AM",
              },
              end: {
                hours: 12,
                minutes: 30,
                period: "PM",
              },
            },
            title: "Client Presentation",
          },
        },
      ],
    },
    {
      id: "Sun Aug 04 2024",
      events: [
        {
          id: "7",
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
            title: "Review Meeting",
          },
        },
        {
          id: "8",
          details: {
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
            title: "Team Lunch",
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
