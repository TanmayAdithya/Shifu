"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ThreeDots } from "react-loader-spinner";

const LoginButton = () => {
  const status = useFormStatus();

  return (
    <Button
      type="submit"
      className={`w-full ${status.pending ? "pointer-events-none opacity-50" : ""}`}
    >
      {status.pending ? (
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
  );
};

export default LoginButton;
