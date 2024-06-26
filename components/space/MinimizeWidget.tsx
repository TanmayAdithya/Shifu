import React from "react";
import { useDispatch } from "react-redux";
import { toggleWidget } from "@/store/slices/widgetSlice";
import { FaCircleMinus as MinimizeIcon } from "react-icons/fa6";

type Props = {
  widgetId: string;
};

const MinimizeWidget = ({ widgetId }: Props) => {
  const dispatch = useDispatch();
  const handleToggleWidget = () => {
    dispatch(toggleWidget(widgetId));
  };

  return (
    <button>
      <MinimizeIcon
        className="cursor-pointer text-neutral-400 transition-colors duration-100 hover:text-neutral-700"
        onClick={handleToggleWidget}
      />
    </button>
  );
};

export default MinimizeWidget;
