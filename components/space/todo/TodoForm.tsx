import React, { useState } from "react";

const TodoForm = () => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: InputEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => handleSubmit} className="mb-4">
      <input
        type="text"
        className="w-full border p-2"
        placeholder="Add a new todo"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="mt-2 w-full rounded bg-blue-600 p-2 text-white"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
