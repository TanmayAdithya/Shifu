import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const SignUpCard = ({ children }: Props) => {
  return (
    <div className="flex w-[28rem] flex-col items-center rounded-xl border-2 border-neutral-100 bg-white p-12 shadow-lg">
      <h1 className="mb-3 text-3xl">Welcome to Shifu!</h1>
      <h2 className="mb-3 text-xl text-[#737373]">Create an account</h2>
      {children}
      <Link href="/login">
        <li className="mt-6 cursor-pointer list-none underline">
          Already have an account?
        </li>
      </Link>
    </div>
  );
};

export default SignUpCard;
