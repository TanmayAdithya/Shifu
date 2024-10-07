import Preview from "@/components/Preview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsStars as Stars } from "react-icons/bs";

export default function Page() {
  return (
    <div className="grid h-full w-full grid-cols-2 p-5">
      {/* Static Noise */}
      <img
        className="absolute inset-0 -z-50 h-full w-full bg-cover opacity-25"
        src="./assets/Random Static.png"
      ></img>
      <div className="h-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 self-start">
            {/* Logo */}
            <div
              className="h-8 w-8 bg-cover bg-no-repeat drop-shadow-sm"
              style={{
                backgroundImage: "url('./Shifu Logo.png')",
              }}
            ></div>
            {/* Title */}
            <div className="font-mori text-xl text-gray-900">shifu</div>
          </div>
          <div className="mr-12">
            <nav className="flex space-x-10 font-mori uppercase">
              <a href="#">
                <p>Home</p>
              </a>
              <a href="#">Features</a>
              <a href="#">Research</a>
              <a href="#">About</a>
            </nav>
          </div>
        </div>
        <div className="mt-36 flex flex-col pr-24">
          <div className="mb-6 flex items-center gap-4">
            <Stars size={"20px"} />
            <p className="font-light uppercase tracking-[.5em]">
              Welcome to shifu
            </p>
          </div>
          <h1 className="mb-8 text-6xl font-semibold tracking-tight text-neutral-800">
            The workspace that works for you.
          </h1>
          <p className="mb-8 font-mori text-lg text-[#676767]">
            Transform your workflow with custom digital workspaces designed to
            keep you focused and productive. Simple tools. Maximum impact.
          </p>
          <Link href="/space">
            <Button className="group flex items-center justify-center gap-4 self-start rounded-2xl border-0 border-none px-5 py-7 transition-all duration-500 hover:border-4 hover:border-neutral-800 hover:bg-yellow-400 hover:text-neutral-800">
              View Dashboard
              <div className="flex h-8 items-center justify-center">
                <span className="flex h-0 w-0 -rotate-180 transform items-center justify-center rounded-full bg-yellow-300 p-0 transition-all duration-500 group-hover:h-[2rem] group-hover:w-[2rem] group-hover:rotate-0 group-hover:p-[0.6rem]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="#fff"
                  >
                    <path
                      d="M1.05403 31.6175C0.271626 32.3972 0.271626 33.6614 1.05403 34.441C1.83644 35.2207 3.10497 35.2207 3.88737 34.441L1.05403 31.6175ZM35.5599 2.05152C35.5599 0.948871 34.6629 0.0549994 33.5564 0.0549994L15.5251 0.0549994C14.4187 0.0549994 13.5217 0.948871 13.5217 2.05152C13.5217 3.15416 14.4187 4.04804 15.5251 4.04804H31.5529V20.0202C31.5529 21.1228 32.4499 22.0167 33.5564 22.0167C34.6629 22.0167 35.5599 21.1228 35.5599 20.0202L35.5599 2.05152ZM3.88737 34.441L34.9731 3.46327L32.1397 0.639766L1.05403 31.6175L3.88737 34.441Z"
                      fill="#000"
                    />
                  </svg>
                </span>
              </div>
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex h-full w-full flex-col rounded-3xl bg-gradient-to-br from-yellow-500/80 via-yellow-400 to-yellow-400/90">
        <div className="flex items-center justify-end">
          <Button className="rounded-2xl border border-neutral-900 bg-neutral-900 p-7 text-yellow-100 transition-all duration-500 hover:bg-yellow-400 hover:text-neutral-800">
            Log in
          </Button>
        </div>
        <Preview />
      </div>
    </div>
  );
}
