import {
  Notes,
  AddNotePayload,
  UpdateContentPayload,
  UpdateTitlePayload,
} from "@/types/types";
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

const initialState: Notes = {
  notes: [
    {
      id: "first",
      title: "First Note",
      content: `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`,
    },
    {
      id: "second",
      title: "Meeting Notes",
      content: `<p>Discuss project milestones and deliverables.</p>`,
    },
    {
      id: "third",
      title: "Grocery List",
      content: `<ul><li>Milk</li><li>Bread</li><li>Eggs</li><li>Cheese</li></ul>`,
    },
    {
      id: "fourth",
      title: "To Do",
      content: `<ol><li>Finish the report</li><li>Call the client</li><li>Prepare presentation</li></ol>`,
    },
    {
      id: "fifth",
      title: "Workout Plan",
      content: `<p>1. Warm-up</p><p>2. Cardio</p><p>3. Strength training</p><p>4. Cool down</p>`,
    },
    {
      id: "sixth",
      title: "Holiday Plans",
      content: `<p>1. Book flights</p><p>2. Reserve hotel</p><p>3. Plan itinerary</p><p>4. Pack bags</p>`,
    },
    {
      id: "seventh",
      title: "Book Recommendations List",
      content: `<p>1. 'The Great Gatsby' by F. Scott Fitzgerald</p><p>2. 'To Kill a Mockingbird' by Harper Lee</p><p>3. '1984' by George Orwell</p>`,
    },
  ],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<AddNotePayload>) => {
      state.notes.unshift({
        id: nanoid(),
        title: action.payload.title,
        content: action.payload.content,
      });
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    updateNoteContent: (state, action: PayloadAction<UpdateContentPayload>) => {
      const note = state.notes.find((note) => note.id === action.payload.id);
      if (note) {
        note.content = action.payload.content;
      }
    },
    updateNoteTitle: (state, action: PayloadAction<UpdateTitlePayload>) => {
      const note = state.notes.find((note) => note.id === action.payload.id);
      if (note) {
        note.title = action.payload.title;
      }
    },
  },
});

export const { addNote, deleteNote, updateNoteContent, updateNoteTitle } =
  notesSlice.actions;

export default notesSlice.reducer;
