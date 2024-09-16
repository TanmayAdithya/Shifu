import { KanbanBoard } from "@/types/types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

const initialState: KanbanBoard = {
  columns: [
    {
      id: "1",
      column_name: "To Do",
      color: "blue",
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
      column_name: "In Progress",
      color: "yellow",
      tasks: [
        { id: "2-1", content: "Task 4" },
        { id: "2-2", content: "Task 5" },
      ],
    },
    {
      id: "3",
      column_name: "Complete",
      color: "green",
      tasks: [
        { id: "3-1", content: "Task 8" },
        { id: "3-2", content: "Task 9" },
      ],
    },
  ],
};

// kanbanSlice.ts

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    reorderTaskInColumn: (
      state,
      action: PayloadAction<{
        columnId: string;
        oldIndex: number;
        newIndex: number;
      }>,
    ) => {
      const column = state.columns.find(
        (col) => col.id === action.payload.columnId,
      );
      if (column) {
        const [movedTask] = column.tasks.splice(action.payload.oldIndex, 1);
        column.tasks.splice(action.payload.newIndex, 0, movedTask);
      }
    },
    moveTaskBetweenColumns: (
      state,
      action: PayloadAction<{
        fromColumnId: UniqueIdentifier;
        toColumnId: UniqueIdentifier;
        taskId: UniqueIdentifier;
      }>,
    ) => {
      const fromColumn = state.columns.find(
        (col) => col.id === action.payload.fromColumnId,
      );
      const toColumn = state.columns.find(
        (col) => col.id === action.payload.toColumnId,
      );
      if (fromColumn && toColumn) {
        const taskIndex = fromColumn.tasks.findIndex(
          (task) => task.id === action.payload.taskId,
        );
        const [movedTask] = fromColumn.tasks.splice(taskIndex, 1);
        toColumn.tasks.push(movedTask);
      }
    },
  },
});

export const { reorderTaskInColumn, moveTaskBetweenColumns } =
  kanbanSlice.actions;
export default kanbanSlice.reducer;
