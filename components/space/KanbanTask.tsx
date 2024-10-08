import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  _id: string;
  color: string;
  content: string;
}

const KanbanTask = ({ color, content, _id }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: _id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const colorMap: { [key: string]: string } = {
    yellow: "bg-yellow-600/80 dark:bg-yellow-700",
    green: "bg-green-500 dark:bg-green-700",
    blue: "bg-blue-500 dark:bg-blue-700",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-lg p-2 text-sm text-neutral-100 backdrop-blur-none ${colorMap[color] || ""} ${
        isDragging ? "shadow-lg" : ""
      }`}
    >
      {content}
    </div>
  );
};

export default KanbanTask;
