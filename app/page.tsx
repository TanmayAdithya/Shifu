import Preview from "@/components/Preview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsStars as Stars } from "react-icons/bs";

export default function Page() {
  return (
    <div className="grid h-full w-full gap-10 p-5 sm:grid-cols-1 lg:grid-cols-2 lg:gap-0">
      {/* Static Noise */}
      <img
        className="absolute inset-0 h-full w-full bg-cover opacity-15"
        src="https://i.postimg.cc/nhHTCk5M/Random-static.webp"
      ></img>
      <div className="z-10 h-full lg:px-6 lg:py-4">
        <div className="flex justify-center md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-2 self-start">
            <div
              className="h-8 w-8 bg-cover bg-no-repeat drop-shadow-sm"
              style={{
                backgroundImage: "url('./Shifu Logo.webp')",
              }}
            ></div>
            <div className="pointer-events-none select-none font-mori text-xl text-gray-900">
              shifu
            </div>
          </div>
          <div className="lg:mr-12">
            <nav className="hidden font-mori uppercase dark:text-neutral-800 md:flex md:space-x-8 md:text-base lg:space-x-3 lg:text-sm xl:space-x-10 xl:text-base">
              <a href="#" className="group relative">
                <p>Home</p>
                <span className="absolute bottom-[-10px] left-0 h-[3px] w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="https://github.com/TanmayAdithya/Shifu?tab=readme-ov-file#-overview"
                className="group relative"
                target="_blank"
                rel="noopener noreferrer"
              >
                Features
                <span className="absolute bottom-[-10px] left-0 h-[3px] w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="https://github.com/TanmayAdithya/Shifu?tab=readme-ov-file#-user-research"
                className="group relative"
                target="_blank"
                rel="noopener noreferrer"
              >
                Research
                <span className="absolute bottom-[-10px] left-0 h-[3px] w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="https://github.com/TanmayAdithya/Shifu"
                className="group relative"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
                <span className="absolute bottom-[-10px] left-0 h-[3px] w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>
          </div>
        </div>
        <div className="mt-12 flex flex-col md:mt-36 md:pr-24">
          <div className="mb-6 flex items-center justify-center gap-4 dark:text-neutral-800 md:justify-start">
            <Stars size={"20px"} />
            <p className="text-sm font-light uppercase tracking-[.5em] dark:text-neutral-800 lg:text-base">
              Welcome to shifu
            </p>
          </div>
          <h1 className="mb-8 text-balance text-5xl font-semibold tracking-tight text-neutral-800 md:text-start lg:text-6xl">
            The workspace that works for you.
          </h1>
          <p className="mb-8 font-mori text-lg text-[#676767]">
            Transform your workflow with custom digital workspaces designed to
            keep you focused and productive. Simple tools. Maximum impact.
          </p>
          <Link href="/space">
            <Button className="group relative flex items-center justify-center gap-[10px] self-start rounded-2xl border-0 border-none px-5 py-7 shadow-lg transition-all duration-500 hover:border-4 hover:border-neutral-800 hover:bg-yellow-400 hover:text-neutral-800 dark:bg-neutral-900 dark:text-yellow-300">
              View Dashboard
              <div className="flex h-8 items-center justify-center">
                <span className="flex h-0 w-0 -rotate-180 transform items-center justify-center rounded-full bg-yellow-300 p-0 transition-all duration-300 group-hover:h-[2rem] group-hover:w-[2rem] group-hover:rotate-0 group-hover:p-[0.6rem]">
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
              <div className="absolute -bottom-1 -left-1 -z-20 h-full w-full rounded-2xl bg-neutral-900 opacity-0 transition-all duration-300 ease-in-out group-hover:bg-neutral-900 group-hover:opacity-100 dark:bg-yellow-400 dark:group-hover:bg-yellow-400"></div>
            </Button>
          </Link>
        </div>
      </div>
      {/* Preview */}
      <div className="relative z-30 flex h-full min-h-fit w-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500/80 via-yellow-400 to-yellow-400/90 shadow-xl lg:min-h-[773.6px] lg:min-w-[740px]">
        <img
          className="absolute inset-0 h-full w-full bg-cover opacity-35"
          src="https://i.postimg.cc/nhHTCk5M/Random-static.webp"
        ></img>
        <div className="hidden items-center justify-end gap-2 pr-3 pt-3 lg:flex">
          <Link href="/signup" className="z-10">
            <Button className="group relative flex items-center justify-center gap-4 self-start rounded-2xl border border-neutral-900 bg-neutral-900 bg-transparent px-5 py-6 text-neutral-900 shadow-lg transition-all duration-500 hover:border-neutral-800 hover:bg-neutral-900 hover:text-yellow-200 hover:shadow-xl dark:bg-neutral-900 dark:text-yellow-300">
              Sign up
              <div className="absolute -bottom-1 -left-1 -z-20 h-full w-full rounded-2xl border border-neutral-900 bg-yellow-400 opacity-0 transition-all duration-300 ease-in-out group-hover:bg-yellow-400 group-hover:opacity-100 dark:bg-neutral-900 dark:group-hover:bg-yellow-400"></div>
            </Button>
          </Link>
          <Link href="/login" className="z-10">
            <Button className="group relative flex items-center justify-center gap-4 self-start rounded-2xl border border-yellow-500 bg-neutral-900 px-5 py-6 text-yellow-100 shadow-lg transition-all duration-500 hover:border-neutral-800 hover:bg-yellow-400 hover:text-neutral-800 hover:shadow-xl dark:bg-neutral-900 dark:text-yellow-300">
              Log In
              <div className="absolute -bottom-1 -left-1 -z-20 h-full w-full rounded-2xl bg-neutral-900 opacity-0 transition-all duration-300 ease-in-out group-hover:bg-neutral-900 group-hover:opacity-100 dark:bg-yellow-400 dark:group-hover:bg-yellow-400"></div>
            </Button>
          </Link>
        </div>
        <Preview />
        <img
          src="/assets/Brain-WEBP.webp"
          className="pointer-events-none absolute -bottom-[600px] left-8 z-0 scale-150 opacity-80"
          alt="brain"
        />
      </div>
    </div>
  );
}
