import React from "react";
import SignUpForm from "@/components/auth/SignUpForm";
import SignUpCard from "@/components/auth/SignUpCard";
SignUpCard;

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex h-full items-center justify-center">
      <SignUpCard>
        <SignUpForm />
      </SignUpCard>
    </div>
  );
}
