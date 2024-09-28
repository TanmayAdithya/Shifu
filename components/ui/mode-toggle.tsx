"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "./switch";
import { useDispatch, useSelector } from "react-redux";
import { toggleGlassMode } from "@/store/slices/themeSlice";
import { RootState } from "@/store/rootReducer";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const dispatch = useDispatch();
  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );

  function handleGlassMode(checked: boolean) {
    dispatch(toggleGlassMode(checked));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-lg outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-ring"
          variant="ghost"
          size="icon"
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`mt-1 ${isGlassMode ? "border border-neutral-50/50 bg-neutral-100 bg-opacity-30 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900 dark:bg-opacity-80" : ""} `}
        align="end"
      >
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-between">
          <Label htmlFor="glassmorphism" className="text-sm">
            Glass
          </Label>
          <Switch
            id="glassmorphism"
            checked={isGlassMode}
            onCheckedChange={handleGlassMode}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
