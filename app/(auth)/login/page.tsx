import React from "react";
import LogInForm from "@/components/auth/LogInForm";
import LogInCard from "@/components/auth/LogInCard";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex h-full items-center justify-center">
      <LogInCard>
        <LogInForm />
      </LogInCard>
    </div>
  );
}
