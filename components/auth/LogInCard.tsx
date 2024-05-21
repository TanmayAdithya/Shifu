import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const LoginCard = ({ children }: Props) => {
  return (
    <div className="flex w-[28rem] flex-col items-center rounded-xl border-2 border-neutral-100 bg-white p-12 shadow-lg">
      <h1 className="mb-3 text-3xl">Welcome Back!</h1>
      <h2 className="mb-3 text-xl text-[#737373]">Log in to your account</h2>
      {children}
      <Link href="/signup">
        <li className="mt-6 cursor-pointer list-none underline">
          Don't have an account? Sign up
        </li>
      </Link>
    </div>
  );
};

export default LoginCard;
