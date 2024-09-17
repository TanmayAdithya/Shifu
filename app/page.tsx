import Link from "next/link";

export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-neutral-300 dark:bg-neutral-900">
      <h1 className="mb-6 text-7xl text-white dark:text-neutral-100">
        Work In Progress
      </h1>
      <Link href="/space">
        <h1 className="rounded-xl bg-neutral-100 px-3 py-2 dark:bg-neutral-100 dark:text-neutral-800">
          Preview
        </h1>
      </Link>
    </div>
  );
}
