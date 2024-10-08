"use client";

import { signupAction } from "@/actions/signup-action";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const result = await signupAction(formData);

    if (result.error) {
      toast({
        variant: "destructive",
        title: `Uh oh! Something went wrong.`,
        description: `${result.error}`,
      });
    } else {
      toast({
        title: `${"Signed up successfully"}`,
        description: `${"Redirecting to your dashboard..."}`,
      });
      router.push("/space");
    }

    setLoading(false);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Link href="/login" className="z-10">
        <Button className="group absolute right-4 top-4 flex items-center justify-center gap-4 self-start rounded-lg bg-neutral-900 px-5 py-6 shadow-lg transition-all duration-500 hover:border-neutral-800 hover:bg-yellow-400 hover:text-neutral-800 hover:shadow-xl dark:bg-neutral-900 dark:text-neutral-100 md:right-8 md:top-8">
          Log In
          <div className="absolute -bottom-1 -left-1 -z-20 h-full w-full rounded-2xl bg-neutral-900 opacity-0 transition-all duration-300 ease-in-out group-hover:bg-neutral-900 group-hover:opacity-100 dark:bg-yellow-400 dark:group-hover:bg-yellow-400"></div>
        </Button>
      </Link>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight dark:text-neutral-900">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground dark:text-neutral-600">
              Enter your details below to create your account
            </p>
          </div>
          <div className="grid gap-6">
            <form action={signupAction} onSubmit={handleFormSubmit}>
              <div className="grid gap-2">
                <div className="space-y-4">
                  <div className="space-y-2 dark:text-neutral-800">
                    <Label>Username</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="e.g. potatobangbang"
                      type="text"
                      required
                    />
                  </div>
                  <div className="space-y-2 dark:text-neutral-800">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      required
                    />
                  </div>
                  <div className="space-y-2 dark:text-neutral-800">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className={`w-full dark:bg-neutral-800 dark:text-neutral-100 ${loading ? "pointer-events-none opacity-50" : ""}`}
                  >
                    {loading ? (
                      <>
                        <span className="mr-2">Signing up</span>
                        <ThreeDots
                          visible={true}
                          height="20"
                          width="20"
                          color="#fff"
                          radius="9"
                          ariaLabel="three-dots-loading"
                        />
                      </>
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
