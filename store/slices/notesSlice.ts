import {
  Notes,
  AddNotePayload,
  UpdateContentPayload,
  UpdateTitlePayload,
  Note,
} from "@/types/types";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";

interface UpdateNotePayload {
  _id: string;
  updates: Partial<Note>;
}

export const fetchNotes = createAsyncThunk<Note[]>(
  "notes/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/notes");
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      return response.json();
    } catch (error) {
      return rejectWithValue("Error fetching notes");
    }
  },
);

export const addNewNote = createAsyncThunk<
  Note,
  {
    title: string;
    content: string;
  }
>("notes/addNote", async (noteData, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });

    if (!response.ok) {
      throw new Error("Failed to create note");
    }

    return response.json();
  } catch (error) {
    return rejectWithValue("Error creating note");
  }
});

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ _id, updates }: UpdateNotePayload, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/notes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, updates }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const result = await response.json();
      return { _id, updates };
    } catch (error) {
      return rejectWithValue("Error updating note");
    }
  },
);

export const removeNote = createAsyncThunk<string, string>(
  "notes/removeNote",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/notes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove note");
      }

      await response.json();
      return _id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Error removing note",
      );
    }
  },
);

const initialState: Notes = {
  notes: [
    {
      _id: "first",
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
      _id: "second",
      title: "Meeting Notes",
      content: `<p>Discuss project milestones and deliverables.</p>`,
    },
    {
      _id: "third",
      title: "Grocery List",
      content: `<ul><li>Milk</li><li>Bread</li><li>Eggs</li><li>Cheese</li></ul>`,
    },
    {
      _id: "fourth",
      title: "To Do",
      content: `<ol><li>Finish the report</li><li>Call the client</li><li>Prepare presentation</li></ol>`,
    },
    {
      _id: "fifth",
      title: "Workout Plan",
      content: `<p>1. Warm-up</p><p>2. Cardio</p><p>3. Strength training</p><p>4. Cool down</p>`,
    },
    {
      _id: "sixth",
      title: "Holiday Plans",
      content: `<p>1. Book flights</p><p>2. Reserve hotel</p><p>3. Plan itinerary</p><p>4. Pack bags</p>`,
    },
    {
      _id: "seventh",
      title: "Book Recommendations List",
      content: `<p>1. 'The Great Gatsby' by F. Scott Fitzgerald</p><p>2. 'To Kill a Mockingbird' by Harper Lee</p><p>3. '1984' by George Orwell</p>`,
    },
  ],
  status: "idle",
  error: null,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<AddNotePayload>) => {
      state.notes.unshift({
        _id: nanoid(),
        title: action.payload.title,
        content: action.payload.content,
      });
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    },
    updateNoteContent: (state, action: PayloadAction<UpdateContentPayload>) => {
      const note = state.notes.find((note) => note._id === action.payload._id);
      if (note) {
        note.content = action.payload.content;
      }
    },
    updateNoteTitle: (state, action: PayloadAction<UpdateTitlePayload>) => {
      const note = state.notes.find((note) => note._id === action.payload._id);
      if (note) {
        note.title = action.payload.title;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addNewNote.fulfilled, (state, action) => {
        state.notes.unshift(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          (todo) => todo._id === action.payload._id,
        );
        if (index !== -1) {
          state.notes[index] = {
            ...state.notes[index],
            ...action.payload.updates,
          };
        }
      })
      .addCase(removeNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note._id !== action.payload);
      });
  },
});

export const { addNote, deleteNote, updateNoteContent, updateNoteTitle } =
  notesSlice.actions;

export default notesSlice.reducer;
