import { AddTaskPayload, KanbanBoard } from "@/types/types";
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

const initialState: KanbanBoard = {
  columns: [
    {
      id: "1",
      name: "To Do",
      tasks: [
        { id: "1-1", content: "Task 1" },
        { id: "1-2", content: "Task 2" },
        { id: "1-3", content: "Task 3" },
        { id: "1-4", content: "Task 4" },
        { id: "1-5", content: "Task 5" },
        { id: "1-6", content: "Task 6" },
        { id: "1-7", content: "Task 7" },
        { id: "1-8", content: "Task 8" },
        { id: "1-9", content: "Task 9" },
        { id: "1-10", content: "Task 10" },
      ],
    },
    {
      id: "2",
      name: "In Progress",
      tasks: [
        { id: "2-1", content: "Task 4" },
        { id: "2-2", content: "Task 5" },
      ],
    },
    {
      id: "3",
      name: "Completed",
      tasks: [
        { id: "3-1", content: "Task 8" },
        { id: "3-2", content: "Task 9" },
      ],
    },
  ],
};

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<AddTaskPayload>) => {
      const column = state.columns.find(
        (column) => column.id === action.payload.columnId,
      );

      column?.tasks.push({ id: nanoid(), content: action.payload.taskContent });
    },
  },
});

export const { addTask } = kanbanSlice.actions;

export default kanbanSlice.reducer;
