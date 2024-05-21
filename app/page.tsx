import Link from "next/link";

export default function page() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-100">
      <Link href="/login">
        <h1>Go to auth</h1>
      </Link>
    </div>
  );
}
