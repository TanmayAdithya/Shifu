"use client";
import React, { useState } from "react";
import { signupAction } from "@/actions/signup-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LuLoader2,
  LuUser,
  LuMail,
  LuLock,
  LuArrowRight,
} from "react-icons/lu";
import { FcGoogle as Google } from "react-icons/fc";
import { createGoogleAuthorizationURL } from "@/actions/google-action";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const result = await signupAction(formData);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: result.error,
      });
    } else {
      toast({
        title: "Signed up successfully",
        description: "Redirecting to your dashboard...",
      });
      router.push("/space");
    }

    setLoading(false);
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
    <div className="flex min-h-full items-center justify-center bg-gradient-to-br from-yellow-500/80 via-yellow-400 to-yellow-400/90 p-4">
      <div
        className="absolute inset-0 h-full w-full bg-cover opacity-35 dark:opacity-20"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/nhHTCk5M/Random-static.webp')",
        }}
      ></div>
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-neutral-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-yellow-300">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Join us and start your journey
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
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

            <div className="relative">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Email
              </Label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LuMail className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
                </div>
                <Input
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  required
                  className="block w-full border-neutral-300 pl-10 focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-transparent dark:text-neutral-100 dark:focus:border-yellow-400 dark:focus:ring-yellow-400"
                />
              </div>
            </div>

            <div className="relative">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
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
          </div>

          <Button
            type="submit"
            className="w-full bg-neutral-900 text-yellow-300 transition-colors duration-300 hover:bg-yellow-400 hover:text-neutral-800 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-500 dark:text-neutral-900 dark:hover:bg-yellow-400 dark:focus:ring-yellow-400"
            disabled={loading}
          >
            {loading ? (
              <>
                <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing up...
              </>
            ) : (
              <>
                Sign up
                <LuArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
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
        <div className="text-center text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">
            Already have an account?
          </span>{" "}
          <Link
            href="/login"
            className="font-medium text-neutral-900 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-300"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
