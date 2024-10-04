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

      console.log("note deleted");

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
      title: "Hello there",
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
      title: "Test",
      content: `
    <h1>Welcome to Your Notes App!</h1>
    <p>This is a simple guide to help you get started with Markdown (MD) syntax. Markdown is a lightweight markup language that lets you format your notes easily using plain text. Here’s a quick overview of how to use it.</p>
    
    <h2>1. Headings</h2>
    <p>You can create headings by adding <code>#</code> before your text.</p>
    
    <pre><code># This is a Heading 1
    ## This is a Heading 2
    ### This is a Heading 3
    #### This is a Heading 4
    </code></pre>
    
    <h3>Example:</h3>
    <h1>This is a Heading 1</h1>
    <h2>This is a Heading 2</h2>
    <h3>This is a Heading 3</h3>
    
    <hr>
    
    <h2>2. Text Formatting</h2>
    <p>You can make your text <strong>bold</strong>, <em>italic</em>, or even <strong><em>both</em></strong>!</p>
    
    <ul>
      <li><strong>Bold</strong>:  
        Wrap your text with double asterisks <code>**</code>.</li>
      <pre><code>**This is bold text**</code></pre>
    
      <li><em>Italic</em>:  
        Wrap your text with a single asterisk <code>*</code>.</li>
      <pre><code>*This is italic text*</code></pre>
    
      <li><strong><em>Bold and Italic</em></strong>:  
        Wrap your text with triple asterisks <code>***</code>.</li>
      <pre><code>***Bold and Italic***</code></pre>
    </ul>
    
    <hr>
    
    <h2>3. Lists</h2>
    
    <h3>Unordered List:</h3>
    <p>Use <code>-</code>, <code>+</code>, or <code>*</code> to create bullet points.</p>
    <pre><code>- Item 1
    - Item 2
      - Sub-item
      - Sub-item
    </code></pre>
    
    <h3>Ordered List:</h3>
    <p>Use numbers followed by a period to create numbered lists.</p>
    <pre><code>1. First item
    2. Second item
    3. Third item
    </code></pre>
    
    <h3>Example:</h3>
    <ul>
      <li>Item 1</li>
      <li>Item 2
        <ul>
          <li>Sub-item</li>
        </ul>
      </li>
    </ul>
    
    <ol>
      <li>First item</li>
      <li>Second item</li>
    </ol>
    
    <hr>
    
    <h2>4. Links</h2>
    <p>You can add hyperlinks to your notes by using this format:</p>
    
    <pre><code>[Link Text](https://www.example.com)</code></pre>
    
    <p>Example: <a href="https://www.markdownguide.org" target="_blank">Visit Markdown Guide</a></p>
    
    <hr>
    
    <h2>5. Images</h2>
    <p>Embed images using the following syntax:</p>
    
    <pre><code>![Alt Text](https://www.example.com/image.jpg)</code></pre>
    
    <p>Example:</p>
    <img src="https://markdown-here.com/img/icon256.png" alt="Markdown Logo" />
    
    <hr>
    
    <h2>6. Blockquotes</h2>
    <p>To quote someone, start the line with <code>&gt;</code>.</p>
    
    <pre><code>&gt; "This is a quote."
    </code></pre>
    
    <p>Example:</p>
    <blockquote>"This is a quote."</blockquote>
    
    <hr>
    
    <h2>7. Code Blocks</h2>
    
    <h3>Inline Code:</h3>
    <p>Wrap code snippets with backticks <code>\`</code>.</p>
    
    <pre><code>Here’s some \`inline code\`.</code></pre>
    
    <h3>Code Blocks:</h3>
    <p>Use triple backticks for multi-line code blocks.</p>
    
    <pre><code>
    
    console.log("Hello World");
    </code></pre>
    
    <p>Example:</p>
    <pre><code>console.log("Hello World");</code></pre>
    
    <hr>
    
    <h2>8. Task Lists</h2>
    <p>You can create interactive task lists using <code>- [ ]</code> for unchecked and <code>- [x]</code> for checked items.</p>
    
    <pre><code>- [ ] Task 1
    - [x] Task 2 (completed)
    </code></pre>
    
    <p>Example:</p>
    <ul>
      <li><input type="checkbox" disabled> Task 1</li>
      <li><input type="checkbox" disabled checked> Task 2 (completed)</li>
    </ul>
    
    <hr>
    
    <h2>9. Horizontal Lines</h2>
    <p>Add horizontal lines to separate sections by using three dashes <code>---</code> or underscores <code>___</code>.</p>
    
    <pre><code>---
    </code></pre>
    
    <hr>
    
    <h2>10. Tables</h2>
    <p>You can create tables using pipes <code>|</code> and dashes <code>-</code>.</p>
    
    <pre><code>| Column 1 | Column 2 | Column 3 |
    |----------|----------|----------|
    | Row 1    | Data     | Data     |
    | Row 2    | Data     | Data     |
    </code></pre>
    
    <h3>Example:</h3>
    <table>
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row 1</td>
          <td>Data</td>
          <td>Data</td>
        </tr>
        <tr>
          <td>Row 2</td>
          <td>Data</td>
          <td>Data</td>
        </tr>
      </tbody>
    </table>
    
    <hr>
    
    <p>That’s it! You’re now ready to start creating and formatting your notes using Markdown. Happy note-taking!</p>
    `,
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
