import {
  AddEventProps,
  CalendarEvent,
  Event,
  UpdateEventProps,
} from "@/types/types";
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

const initialState: { calendarEvents: CalendarEvent[] } = {
  calendarEvents: [
    {
      dateId: "Thu Aug 01 2024",
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
      dateId: "Fri Aug 02 2024",
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
      let calendarEvent = state.calendarEvents.find(
        (event) => event.dateId === action.payload.dateId,
      );

      if (!calendarEvent) {
        calendarEvent = {
          dateId: action.payload.dateId,
          events: [],
        };
        state.calendarEvents.push(calendarEvent);
      }

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
    },

    updateEvent: (state, action: PayloadAction<UpdateEventProps>) => {
      const { dateId, id, ...updatedFields } = action.payload;
      const calendarEvent = state.calendarEvents.find(
        (event) => event.dateId === dateId,
      );

      if (calendarEvent) {
        const event = calendarEvent.events.find(
          (event) => event.id === action.payload.id,
        );

        if (event) {
          Object.entries(updatedFields).forEach(([key, value]) => {
            if (value !== undefined) {
              (event as any)[key as keyof CalendarEvent] = value;
            }
          });
        }
      }
    },
    removeEvent: (
      state,
      action: PayloadAction<{ dateId: string; id: string }>,
    ) => {
      const { dateId, id } = action.payload;

      const calendarEvent = state.calendarEvents.find(
        (event) => event.dateId === dateId,
      );

      if (calendarEvent) {
        calendarEvent.events = calendarEvent.events.filter(
          (event) => event.id !== id,
        );

        if (!calendarEvent.events.length) {
          state.calendarEvents = state.calendarEvents.filter(
            (event) => event.dateId === dateId,
          );
        }
      }
    },
  },
});

export const { addEvent, updateEvent, removeEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
