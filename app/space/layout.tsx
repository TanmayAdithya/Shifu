"use client";

export default function SpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-full flex-col items-center justify-end">
        {children}
      </div>
    </>
  );
}
