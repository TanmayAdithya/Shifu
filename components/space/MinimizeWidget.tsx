import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWidget } from "@/store/slices/widgetSlice";
import { FiMinus as MinimizeIcon } from "react-icons/fi";
import { RootState } from "@/store/rootReducer";

type Props = {
  widgetId: string;
};

const MinimizeWidget = ({ widgetId }: Props) => {
  const dispatch = useDispatch();
  const handleToggleWidget = () => {
    dispatch(toggleWidget(widgetId));
  };

  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );

  return (
    <button className="">
      <MinimizeIcon
        className={`${isGlassMode ? "text-neutral-200 hover:text-neutral-400 dark:text-neutral-300" : "text-neutral-600 hover:text-neutral-800 dark:text-neutral-50"} cursor-pointer transition-colors duration-100`}
        onClick={handleToggleWidget}
        size={"18px"}
      />
    </button>
  );
};

export default MinimizeWidget;
