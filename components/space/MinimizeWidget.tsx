import React from "react";
import { useDispatch } from "react-redux";
import { toggleWidget } from "@/store/slices/widgetSlice";
import { FiMinus as MinimizeIcon } from "react-icons/fi";

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
        className="cursor-pointer text-neutral-600 transition-colors duration-100 hover:text-neutral-800"
        onClick={handleToggleWidget}
        size={"18px"}
      />
    </button>
  );
};

export default MinimizeWidget;
