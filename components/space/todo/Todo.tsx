import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

type Props = {};

const Todo = (props: Props) => {
  return (
    <div className="absolute left-56 top-20 mx-auto w-[20rem] max-w-xs rounded-xl bg-white p-4">
      <h1 className="mb-4 text-xl font-medium">Todo</h1>
      <div>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
};

export default Todo;
