import { KanbanBoard, Todo } from "@/types/types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk<Todo[]>(
  "kanban/fetchTasks",
  async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        console.log("Error fetching tasks");
      }
      const data: Todo[] = await response.json();
      return data;
    } catch (error) {
      console.log("Error", error);
      return [];
    }
  },
);

const organizeTasksIntoColumns = (tasks: Todo[]) => {
  const columns = {
    todo: tasks.filter((task) => task.status === "todo"),
    inProgress: tasks.filter((task) => task.status === "in-progress"),
    complete: tasks.filter((task) => task.status === "complete"),
  };

  return {
    columns: [
      {
        id: "1",
        column_name: "To Do",
        color: "blue",
        tasks: columns.todo,
      },
      {
        id: "2",
        column_name: "In Progress",
        color: "yellow",
        tasks: columns.inProgress,
      },
      {
        id: "3",
        column_name: "Complete",
        color: "green",
        tasks: columns.complete,
      },
    ],
  };
};

const initialState: KanbanBoard = {
  columns: [
    {
      id: "1",
      column_name: "To Do",
      color: "blue",
      tasks: [],
    },
    {
      id: "2",
      column_name: "In Progress",
      color: "yellow",
      tasks: [],
    },
    {
      id: "3",
      column_name: "Complete",
      color: "green",
      tasks: [],
    },
  ],
};

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
          (task) => task._id === action.payload.taskId,
        );
        const [movedTask] = fromColumn.tasks.splice(taskIndex, 1);

        if (toColumn.id === "1") {
          movedTask.status = "todo";
        } else if (toColumn.id === "2") {
          movedTask.status = "in-progress";
        } else if (toColumn.id === "3") {
          movedTask.status = "complete";
        }

        toColumn.tasks.push(movedTask);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      const tasks = action.payload;
      const organizedColumns = organizeTasksIntoColumns(tasks);
      state.columns = organizedColumns.columns;
    });

    builder.addCase(fetchTasks.rejected, (state, action) => {
      console.error("Error fetching tasks:", action.error.message);
    });
  },
});

export const { reorderTaskInColumn, moveTaskBetweenColumns } =
  kanbanSlice.actions;
export default kanbanSlice.reducer;
