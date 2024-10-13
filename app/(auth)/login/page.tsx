"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle as Google } from "react-icons/fc";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import React, { useState } from "react";
import { loginAction } from "@/actions/login-action";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { createGoogleAuthorizationURL } from "@/actions/google-action";
import {
  LuLoader2,
  LuUser,
  LuMail,
  LuLock,
  LuArrowRight,
} from "react-icons/lu";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const result = await loginAction(formData);

    if (result.error) {
      toast({
        variant: "destructive",
        title: `Uh oh! Something went wrong.`,
        description: `${result.error}`,
      });
    } else {
      router.push("/space");
    }
    setTimeout(() => setLoading(false), 3000);
  };

  async function onGoogleClick() {
    const res = await createGoogleAuthorizationURL();
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    } else if (res.success) {
      window.location.href = res.data.toString();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-500/80 via-yellow-400 to-yellow-400/90 p-4">
      <div
        className="absolute inset-0 h-full w-full bg-cover opacity-35 dark:opacity-20"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/nhHTCk5M/Random-static.webp')",
        }}
      ></div>
      <form
        action={loginAction}
        onSubmit={handleFormSubmit}
        className="relative z-10 flex w-full max-w-md flex-col items-center justify-center gap-3 rounded-xl"
      >
        <Card className="w-full bg-white shadow-lg dark:bg-neutral-900">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-neutral-800 dark:text-yellow-300">
              Login
            </CardTitle>
            <CardDescription className="text-neutral-600 dark:text-neutral-400">
              Enter your username and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-neutral-700 dark:text-neutral-300"
                >
                  Username
                </Label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <LuUser className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
                  </div>
                  <Input
                    id="username"
                    name="username"
                    placeholder="e.g. potatobangbang"
                    type="text"
                    required
                    className="block w-full border-neutral-300 pl-10 focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-transparent dark:text-neutral-100 dark:focus:border-yellow-400 dark:focus:ring-yellow-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-neutral-700 dark:text-neutral-300"
                >
                  Password
                </Label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <LuLock className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
                  </div>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="block w-full border-neutral-300 pl-10 focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-transparent dark:text-neutral-100 dark:focus:border-yellow-400 dark:focus:ring-yellow-400"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className={`w-full bg-neutral-900 text-yellow-300 transition-colors duration-300 hover:bg-yellow-400 hover:text-neutral-800 dark:bg-yellow-500 dark:text-neutral-900 dark:hover:bg-yellow-400 ${loading ? "pointer-events-none opacity-50" : ""}`}
              >
                {loading ? (
                  <>
                    <span className="mr-2">Logging in</span>
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
                  "Login"
                )}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-neutral-300 dark:border-neutral-600"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                className="w-full gap-1 border border-neutral-300 bg-white text-neutral-800 transition-colors duration-300 hover:bg-neutral-50 dark:border-neutral-500 dark:bg-transparent dark:text-neutral-100 dark:hover:bg-neutral-800"
                onClick={onGoogleClick}
              >
                <Google />
                Google
              </Button>
            </div>
          </CardContent>
        </Card>
        <p className="text-sm text-neutral-800 dark:text-neutral-900">
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <span className="cursor-pointer text-yellow-600 underline hover:text-yellow-700 dark:text-neutral-900 dark:hover:text-neutral-800">
              Sign up
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Page;
