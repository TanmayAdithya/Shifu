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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoVideocamOutline as VideoCall } from "react-icons/io5";
import FullScreenIcon from "@/components/space/FullScreenIcon";
import { IoMdSettings as SettingsIcon } from "react-icons/io";
import { TbUserFilled as UserIcon } from "react-icons/tb";
import LogoutButton from "@/components/auth/LogoutButton";
import { ModeToggle } from "@/components/ui/mode-toggle";

type Props = {
  fallback: string[];
  username: string;
  email: string;
};

const UtilityBar = ({ fallback, username, email }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const interactionTimeRef = useRef<number>(Date.now());

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

  return (
    <div
      className={`fixed right-2 top-3 z-50 flex items-center gap-2 ${isVisible ? "opacity-100" : "opacity-0"} transform transition-opacity duration-700 ease-in-out`}
      style={{ zIndex: 1000 }}
    >
      <div className="flex h-11 w-28 items-center justify-between rounded-xl bg-white p-1 shadow-md dark:bg-neutral-900">
        <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:hover:bg-orange-500/80">
          <div>
            <VideoCall size={"1.25rem"} />
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
          <Avatar className="h-12 w-12 border-2 border-neutral-50 shadow-md dark:border-neutral-900">
            <AvatarImage
              className="shadow-xl"
              src="https://avatars.githubusercontent.com/u/120048605?v=4"
            />
            <AvatarFallback>
              {fallback[0][0].toUpperCase() +
                (fallback[1]
                  ? fallback[1][0].toUpperCase()
                  : fallback[0][1].toUpperCase())}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 min-w-52 rounded-xl p-2">
          <div className="ml-1 flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage
                className="shadow-xl"
                src="https://avatars.githubusercontent.com/u/120048605?v=4"
              />
              <AvatarFallback>
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
          <DropdownMenuSeparator />
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <UserIcon className="mr-1 text-neutral-700 dark:text-neutral-100" />
                Profile
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="z-[100]">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <SettingsIcon className="mr-1 text-neutral-700 dark:text-neutral-100" />
                Settings
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="z-[100]">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>Settings Dialog</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UtilityBar;
