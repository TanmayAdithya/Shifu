"use client";

import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FullScreenIcon from "@/components/space/FullScreenIcon";
import { RxSpeakerLoud as SpeakerOnIcon } from "react-icons/rx";
import { RxSpeakerOff as SpeakerOffIcon } from "react-icons/rx";
import LogoutButton from "@/components/auth/LogoutButton";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { AppDispatch } from "@/store/store";
import { muteVideo } from "@/store/slices/youtubeSlice";

type Props = {
  fallback: string[];
  username: string;
  email: string;
};

const UtilityBar = ({ fallback, username, email }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const interactionTimeRef = useRef<number>(Date.now());
  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );
  const muted = useSelector((state: RootState) => state.youtube.muted);
  const dispatch: AppDispatch = useDispatch();

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (Date.now() - interactionTimeRef.current >= 3000) {
        setIsVisible(false);
      }
    }, 3000);
  };

  const glassStyle = isGlassMode
    ? "bg-opacity-70 backdrop-blur-lg dark:bg-opacity-70"
    : "";

  useEffect(() => {
    const handleInteraction = () => {
      setIsVisible(true);
      interactionTimeRef.current = Date.now();
      resetTimer();
    };

    document.addEventListener("mousemove", handleInteraction);
    document.addEventListener("wheel", handleInteraction);
    document.addEventListener("click", handleInteraction);

    // Initial timer setup
    resetTimer();

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleInteraction);
      document.removeEventListener("wheel", handleInteraction);
      document.removeEventListener("click", handleInteraction);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleToggleMute(muted: boolean) {
    dispatch(muteVideo(!muted));
  }

  return (
    <div
      className={`fixed right-2 top-3 z-50 flex items-center gap-2 ${isVisible ? "opacity-100" : "opacity-0"} transform transition-opacity duration-700 ease-in-out`}
      style={{ zIndex: 1000 }}
    >
      <div
        className={`flex h-11 w-28 items-center justify-between rounded-xl bg-white p-1 shadow-md dark:bg-neutral-900 ${isGlassMode ? "bg-opacity-30 backdrop-blur dark:bg-opacity-80" : ""} `}
      >
        <div
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:hover:bg-orange-500/80"
          onClick={() => handleToggleMute(muted)}
        >
          <div>
            {muted ? (
              <SpeakerOffIcon size={"1.15rem"} />
            ) : (
              <SpeakerOnIcon size={"1.15rem"} />
            )}
          </div>
        </div>
        <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:hover:bg-neutral-800">
          <FullScreenIcon />
        </div>
        <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-neutral-200">
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar
            className={`h-12 w-12 border ${isGlassMode ? "border-neutral-50/30 dark:border-neutral-800" : "border-transparent dark:border-neutral-900"} shadow-md`}
          >
            <AvatarImage className="shadow-xl" />
            <AvatarFallback
              className={`${isGlassMode ? "bg-neutral-50/30 dark:bg-neutral-800/80" : ""} dark:bg-neutral-900`}
            >
              {fallback[0][0].toUpperCase() +
                (fallback[1]
                  ? fallback[1][0].toUpperCase()
                  : fallback[0][1].toUpperCase())}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`${isGlassMode ? "border border-neutral-50/30 bg-neutral-50/30 bg-opacity-80 backdrop-blur dark:bg-neutral-900 dark:bg-opacity-80" : ""} mr-2 min-w-52 rounded-xl p-2`}
        >
          <div className="ml-1 flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage className="shadow-xl" />
              <AvatarFallback className="text-xs">
                {fallback[0][0].toUpperCase() +
                  (fallback[1]
                    ? fallback[1][0].toUpperCase()
                    : fallback[0][1].toUpperCase())}
              </AvatarFallback>
            </Avatar>
            <div className="mb-1">
              <DropdownMenuLabel className="py-0 font-medium">
                {username}
              </DropdownMenuLabel>
              <DropdownMenuLabel className="py-0 text-xs font-normal text-neutral-600 dark:text-neutral-400">
                {email}
              </DropdownMenuLabel>
            </div>
          </div>
          <DropdownMenuSeparator
            className={`${isGlassMode ? "bg-neutral-50/60" : ""}`}
          />
          <DropdownMenuItem className="cursor-pointer">
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UtilityBar;
