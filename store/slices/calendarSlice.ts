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
              start: { hours: 9, minutes: 30, period: "AM" },
              end: { hours: 10, minutes: 30, period: "AM" },
            },
            title: "Candidate Interview",
          },
        },
        {
          id: "2",
          details: {
            time: {
              start: { hours: 11, minutes: 0, period: "AM" },
              end: { hours: 12, minutes: 0, period: "PM" },
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
              start: { hours: 1, minutes: 0, period: "PM" },
              end: { hours: 2, minutes: 0, period: "PM" },
            },
            title: "Project Meeting",
          },
        },
        {
          id: "4",
          details: {
            time: {
              start: { hours: 2, minutes: 30, period: "PM" },
              end: { hours: 3, minutes: 30, period: "PM" },
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
              start: { hours: 10, minutes: 0, period: "AM" },
              end: { hours: 11, minutes: 0, period: "AM" },
            },
            title: "Strategy Session",
          },
        },
        {
          id: "6",
          details: {
            time: {
              start: { hours: 11, minutes: 30, period: "AM" },
              end: { hours: 12, minutes: 30, period: "PM" },
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
              start: { hours: 9, minutes: 30, period: "AM" },
              end: { hours: 10, minutes: 30, period: "AM" },
            },
            title: "Review Meeting",
          },
        },
        {
          id: "8",
          details: {
            time: {
              start: { hours: 11, minutes: 0, period: "AM" },
              end: { hours: 12, minutes: 0, period: "PM" },
            },
            title: "Team Lunch",
          },
        },
      ],
    },
    {
      id: "Mon Aug 05 2024",
      events: [
        {
          id: "9",
          details: {
            time: {
              start: { hours: 8, minutes: 0, period: "AM" },
              end: { hours: 9, minutes: 0, period: "AM" },
            },
            title: "Morning Briefing",
          },
        },
        {
          id: "10",
          details: {
            time: {
              start: { hours: 10, minutes: 30, period: "AM" },
              end: { hours: 11, minutes: 30, period: "AM" },
            },
            title: "Sales Call",
          },
        },
        {
          id: "11",
          details: {
            time: {
              start: { hours: 2, minutes: 0, period: "PM" },
              end: { hours: 3, minutes: 0, period: "PM" },
            },
            title: "Team Check-in",
          },
        },
      ],
    },
    {
      id: "Tue Aug 06 2024",
      events: [
        {
          id: "12",
          details: {
            time: {
              start: { hours: 9, minutes: 0, period: "AM" },
              end: { hours: 10, minutes: 0, period: "AM" },
            },
            title: "Planning Session",
          },
        },
        {
          id: "13",
          details: {
            time: {
              start: { hours: 11, minutes: 0, period: "AM" },
              end: { hours: 12, minutes: 0, period: "PM" },
            },
            title: "Code Review",
          },
        },
        {
          id: "14",
          details: {
            time: {
              start: { hours: 2, minutes: 30, period: "PM" },
              end: { hours: 3, minutes: 30, period: "PM" },
            },
            title: "Client Call",
          },
        },
      ],
    },
    {
      id: "Wed Aug 07 2024",
      events: [
        {
          id: "15",
          details: {
            time: {
              start: { hours: 8, minutes: 0, period: "AM" },
              end: { hours: 9, minutes: 0, period: "AM" },
            },
            title: "Daily Standup",
          },
        },
        {
          id: "16",
          details: {
            time: {
              start: { hours: 10, minutes: 0, period: "AM" },
              end: { hours: 11, minutes: 0, period: "AM" },
            },
            title: "Design Review",
          },
        },
      ],
    },
    {
      id: "Thu Aug 08 2024",
      events: [
        {
          id: "17",
          details: {
            time: {
              start: { hours: 9, minutes: 30, period: "AM" },
              end: { hours: 10, minutes: 30, period: "AM" },
            },
            title: "Interview with John",
          },
        },
        {
          id: "18",
          details: {
            time: {
              start: { hours: 11, minutes: 0, period: "AM" },
              end: { hours: 12, minutes: 0, period: "PM" },
            },
            title: "Project Update",
          },
        },
        {
          id: "19",
          details: {
            time: {
              start: { hours: 2, minutes: 0, period: "PM" },
              end: { hours: 3, minutes: 0, period: "PM" },
            },
            title: "Sprint Planning",
          },
        },
      ],
    },
    {
      id: "Fri Aug 09 2024",
      events: [
        {
          id: "20",
          details: {
            time: {
              start: { hours: 9, minutes: 0, period: "AM" },
              end: { hours: 10, minutes: 0, period: "AM" },
            },
            title: "Weekly Review",
          },
        },
        {
          id: "21",
          details: {
            time: {
              start: { hours: 11, minutes: 0, period: "AM" },
              end: { hours: 12, minutes: 0, period: "PM" },
            },
            title: "Client Meeting",
          },
        },
        {
          id: "22",
          details: {
            time: {
              start: { hours: 2, minutes: 30, period: "PM" },
              end: { hours: 3, minutes: 30, period: "PM" },
            },
            title: "Team Retrospective",
          },
        },
        {
          id: "23",
          details: {
            time: {
              start: { hours: 4, minutes: 0, period: "PM" },
              end: { hours: 5, minutes: 0, period: "PM" },
            },
            title: "One-on-One",
          },
        },
      ],
    },
    {
      id: "Sat Aug 10 2024",
      events: [
        {
          id: "24",
          details: {
            time: {
              start: { hours: 10, minutes: 0, period: "AM" },
              end: { hours: 11, minutes: 0, period: "AM" },
            },
            title: "Workshop",
          },
        },
        {
          id: "25",
          details: {
            time: {
              start: { hours: 1, minutes: 0, period: "PM" },
              end: { hours: 2, minutes: 0, period: "PM" },
            },
            title: "Client Demo",
          },
        },
      ],
    },
    {
      id: "Sun Aug 11 2024",
      events: [
        {
          id: "26",
          details: {
            time: {
              start: { hours: 9, minutes: 30, period: "AM" },
              end: { hours: 10, minutes: 30, period: "AM" },
            },
            title: "Brunch Meeting",
          },
        },
        {
          id: "27",
          details: {
            time: {
              start: { hours: 11, minutes: 0, period: "AM" },
              end: { hours: 12, minutes: 0, period: "PM" },
            },
            title: "Team Outing",
          },
        },
      ],
    },
    {
      id: "Mon Aug 12 2024",
      events: [
        {
          id: "28",
          details: {
            time: {
              start: { hours: 8, minutes: 0, period: "AM" },
              end: { hours: 9, minutes: 0, period: "AM" },
            },
            title: "Morning Standup",
          },
        },
        {
          id: "29",
          details: {
            time: {
              start: { hours: 10, minutes: 30, period: "AM" },
              end: { hours: 11, minutes: 30, period: "AM" },
            },
            title: "Product Review",
          },
        },
        {
          id: "30",
          details: {
            time: {
              start: { hours: 2, minutes: 0, period: "PM" },
              end: { hours: 3, minutes: 0, period: "PM" },
            },
            title: "Client Call",
          },
        },
        {
          id: "31",
          details: {
            time: {
              start: { hours: 4, minutes: 0, period: "PM" },
              end: { hours: 5, minutes: 0, period: "PM" },
            },
            title: "Team Sync",
          },
        },
      ],
    },
    {
      id: "Tue Aug 13 2024",
      events: [
        {
          id: "32",
          details: {
            time: {
              start: { hours: 9, minutes: 0, period: "AM" },
              end: { hours: 10, minutes: 0, period: "AM" },
            },
            title: "Planning Session",
          },
        },
        {
          id: "33",
          details: {
            time: {
              start: { hours: 11, minutes: 0, period: "AM" },
              end: { hours: 12, minutes: 0, period: "PM" },
            },
            title: "Code Review",
          },
        },
      ],
    },
    {
      id: "Wed Aug 14 2024",
      events: [
        {
          id: "34",
          details: {
            time: {
              start: { hours: 8, minutes: 0, period: "AM" },
              end: { hours: 9, minutes: 0, period: "AM" },
            },
            title: "Daily Standup",
          },
        },
        {
          id: "35",
          details: {
            time: {
              start: { hours: 10, minutes: 0, period: "AM" },
              end: { hours: 11, minutes: 0, period: "AM" },
            },
            title: "Design Review",
          },
        },
        {
          id: "36",
          details: {
            time: {
              start: { hours: 2, minutes: 0, period: "PM" },
              end: { hours: 3, minutes: 0, period: "PM" },
            },
            title: "Client Meeting",
          },
        },
      ],
    },
    {
      id: "Thu Aug 15 2024",
      events: [
        {
          id: "37",
          details: {
            time: {
              start: { hours: 9, minutes: 30, period: "AM" },
              end: { hours: 10, minutes: 30, period: "AM" },
            },
            title: "Interview with Alice",
          },
        },
        {
          id: "38",
          details: {
            time: {
              start: { hours: 11, minutes: 0, period: "AM" },
              end: { hours: 12, minutes: 0, period: "PM" },
            },
            title: "Project Update",
          },
        },
        {
          id: "39",
          details: {
            time: {
              start: { hours: 2, minutes: 0, period: "PM" },
              end: { hours: 3, minutes: 0, period: "PM" },
            },
            title: "Sprint Planning",
          },
        },
        {
          id: "40",
          details: {
            time: {
              start: { hours: 4, minutes: 0, period: "PM" },
              end: { hours: 5, minutes: 0, period: "PM" },
            },
            title: "Team Sync",
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
