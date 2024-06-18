import TodoItem from "./TodoItem";

const todos = [
  {
    id: 1,
    content: "jello bean",
  },
  {
    id: 2,
    content: "jello bean",
  },
  {
    id: 3,
    content: "jello bean",
  },
  {
    id: 4,
    content: "jello bean",
  },
  {
    id: 1,
    content: "jello bean",
  },
  {
    id: 2,
    content: "jello bean",
  },
  {
    id: 3,
    content: "jello bean",
  },
  {
    id: 4,
    content: "jello bean",
  },
];

import React from "react";

const todos2 = [
  {
    id: 1,
    content:
      "Buy groceries, including fruits, vegetables, dairy, and other essentials that are needed for the week.",
  },
  {
    id: 2,
    content:
      "Call the bank to inquire about the loan application process and necessary documents.",
  },
  {
    id: 3,
    content: "Schedule dentist appointment for annual check-up and cleaning.",
  },
  {
    id: 4,
    content:
      "Finish reading the book 'The Great Gatsby' by F. Scott Fitzgerald before the book club meeting next week.",
  },
  {
    id: 5,
    content:
      "Clean the house, especially the living room, kitchen, and bathrooms.",
  },
  {
    id: 6,
    content:
      "Work on project report due by end of the month, including research and data analysis.",
  },
  {
    id: 7,
    content: "Prepare dinner with a new recipe from the cookbook.",
  },
  {
    id: 8,
    content: "Exercise for 30 minutes, including cardio and strength training.",
  },
];

const TodoList = () => {
  return (
    <ul className="relative h-[256px] space-y-2 overflow-y-scroll">
      {todos2.map((todo) => (
        <TodoItem key={todo.id} content={todo.content} />
      ))}
    </ul>
  );
};

export default TodoList;
