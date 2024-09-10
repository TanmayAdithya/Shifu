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
import React from "react";
import { loginAction } from "@/actions/login-action";
import LoginButton from "@/components/auth/LoginButton";

const page = () => {
  return (
    <form
      action={loginAction}
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
            <LoginButton />
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

export default page;
