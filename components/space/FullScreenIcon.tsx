"use client";

import React, { useState, useEffect } from "react";
import { GoScreenFull as FullScreen } from "react-icons/go";
import { BsFullscreenExit as ExitFullScreen } from "react-icons/bs";

const FullScreenIcon = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const updateFullScreen = () =>
      setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", updateFullScreen);
    return () =>
      document.removeEventListener("fullscreenchange", updateFullScreen);
  }, []);

  const toggleFullScreen = () => {
    !document.fullscreenElement
      ? document.documentElement.requestFullscreen()
      : document.exitFullscreen();
  };

  return (
    <div
      onClick={toggleFullScreen}
      className="flex h-full w-full items-center justify-center"
    >
      {isFullScreen ? (
        <ExitFullScreen size="1rem" />
      ) : (
        <FullScreen size="1.25rem" />
      )}
    </div>
  );
};

export default FullScreenIcon;
