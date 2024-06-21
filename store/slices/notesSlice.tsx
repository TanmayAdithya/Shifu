import { Notes, AddNotePayload } from "@/types/types";
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

const initialState: Notes = {
  notes: [
    {
      id: "first",
      title: "first",
      content: `<h1>YOLO</h1>`,
    },
  ],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<AddNotePayload>) => {
      state.notes.push({
        id: nanoid(),
        title: action.payload.title,
        content: action.payload.content,
      });
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, removeNote } = notesSlice.actions;

export default notesSlice.reducer;
