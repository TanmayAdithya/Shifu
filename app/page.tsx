"use client";

import { guestAuthAction } from "@/actions/guest-action";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Use client-side router for navigation

export default function Page() {
  const router = useRouter();

  const handleGuestLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await guestAuthAction();

    if (!result.success) {
      toast({
        variant: "destructive",
        title: `Uh oh! Something went wrong.`,
      });
    } else {
      router.push("/guest-space");
    }
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-neutral-300 dark:bg-neutral-900">
      <h1 className="mb-6 text-7xl text-white dark:text-neutral-100">
        Work In Progress
      </h1>
      <div className="flex">
        <Link href="/space">
          <h1 className="rounded-xl bg-neutral-100 px-3 py-2 dark:bg-neutral-100 dark:text-neutral-800">
            Preview
          </h1>
        </Link>

        <form action={guestAuthAction} onSubmit={handleGuestLogin}>
          <Button type="submit">Continue as Guest</Button>
        </form>
      </div>
    </div>
  );
}
