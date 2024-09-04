import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
  quadrant: Quadrant;
}

type Quadrant =
  | "urgent-important"
  | "urgent-not-important"
  | "not-urgent-important"
  | "not-urgent-not-important";

type Props = {
  openMatrixWidget: boolean;
};

const Matrix = ({ openMatrixWidget }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState<string>("");
  const [selectedQuadrant, setSelectedQuadrant] =
    useState<Quadrant>("urgent-important");

  const addTask = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      text: taskText,
      quadrant: selectedQuadrant,
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  const renderQuadrantTasks = (quadrant: Quadrant) => {
    return tasks
      .filter((task) => task.quadrant === quadrant)
      .map((task) => <li key={task.id}>{task.text}</li>);
  };

  return (
    <div className={`${openMatrixWidget ? "" : "hidden"} absolute z-10`}>
      <div className="grid grid-cols-2 gap-5 bg-white">
        <div>
          <h2>Urgent & Important</h2>
          <ul>{renderQuadrantTasks("urgent-important")}</ul>
        </div>
        <div>
          <h2>Urgent & Not Important</h2>
          <ul>{renderQuadrantTasks("urgent-not-important")}</ul>
        </div>
        <div>
          <h2>Not Urgent & Important</h2>
          <ul>{renderQuadrantTasks("not-urgent-important")}</ul>
        </div>
        <div>
          <h2>Not Urgent & Not Important</h2>
          <ul>{renderQuadrantTasks("not-urgent-not-important")}</ul>
        </div>
        <div style={{ gridColumn: "span 2", marginTop: "20px" }}>
          <h3>Add Task</h3>
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Task Description"
          />
          <select
            value={selectedQuadrant}
            onChange={(e) => setSelectedQuadrant(e.target.value as Quadrant)}
          >
            <option value="urgent-important">Urgent & Important</option>
            <option value="urgent-not-important">Urgent & Not Important</option>
            <option value="not-urgent-important">Not Urgent & Important</option>
            <option value="not-urgent-not-important">
              Not Urgent & Not Important
            </option>
          </select>
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className={`${openMatrixWidget ? "" : "hidden"} absolute z-10`}>
  //     Matrix
  //   </div>
  // );
};

export default Matrix;
