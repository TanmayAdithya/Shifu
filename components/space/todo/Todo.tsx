import MinimizeWidget from "../MinimizeWidget";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

type Props = {
  openTodoWidget: boolean;
};

const Todo = ({ openTodoWidget }: Props) => {
  return (
    <div
      className={`${openTodoWidget ? "" : "hidden"} absolute right-56 top-10 mx-auto w-[20rem] max-w-xs rounded-xl bg-white p-4`}
    >
      <h1 className="mb-4 text-xl font-medium">Todo</h1>
      <div className="absolute right-4 top-4">
        <MinimizeWidget widgetId="Todo" />
      </div>
      <div>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
};

export default Todo;
