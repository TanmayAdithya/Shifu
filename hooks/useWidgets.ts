import { OpenWidgetsState } from "@/types/types";
import { useState } from "react";

const useWidgets = () => {
  const [openWidgets, setOpenWidgets] = useState<OpenWidgetsState>({});

  const toggleWidget = (id: string) => {
    setOpenWidgets((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  return { openWidgets, toggleWidget };
};

export default useWidgets;
