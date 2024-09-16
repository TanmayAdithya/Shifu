import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id: string;
  color: string;
  content: string;
}

const KanbanTask = ({ color, content, id }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-lg p-2 text-sm text-neutral-100 ${color} ${
        isDragging ? "shadow-lg transition-colors duration-1000" : ""
      }`}
    >
      {content}
    </div>
  );
};

export default KanbanTask;
