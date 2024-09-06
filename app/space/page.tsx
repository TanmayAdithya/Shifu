import SpaceBackground from "@/components/space/SpaceBackground";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="h-full w-full bg-neutral-900">
      <SpaceBackground />
    </div>
  );
}
