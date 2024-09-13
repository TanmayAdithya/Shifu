"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  return (
    <form
      action={loginAction}
      onSubmit={handleFormSubmit}
      className="flex h-full flex-col items-center justify-center gap-3"
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your username and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" name="username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button
              type="submit"
              className={`w-full ${loading ? "pointer-events-none opacity-50" : ""}`}
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
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup">
          <span className="cursor-pointer underline">Sign up</span>
        </Link>
      </p>
    </form>
  );
};

export default Page;
