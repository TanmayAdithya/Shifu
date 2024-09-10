"use client";

import { logoutAction } from "@/actions/logout-action";
import { toast } from "@/hooks/use-toast";
import React from "react";
import { useFormStatus } from "react-dom";
import { IoLogOut as LogoutIcon } from "react-icons/io5";

const LogoutButton = () => {
  const status = useFormStatus();

  function handleLogout() {
    if (!status.pending) {
      toast({
        description: "Logged Out.",
      });
    }
  }

  return (
    <form className="w-full" action={logoutAction} onSubmit={handleLogout}>
      <button type="submit" className="flex w-full items-center">
        <LogoutIcon className="mr-1 text-neutral-700" /> Log out
      </button>
    </form>
  );
};

export default LogoutButton;
