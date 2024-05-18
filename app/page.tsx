import Link from "next/link";

export default function page() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-100">
      <Link href="/space">
        <h1>Go to space</h1>
      </Link>
    </div>
  );
}
