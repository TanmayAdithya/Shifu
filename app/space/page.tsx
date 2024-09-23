import SpaceBackground from "@/components/space/SpaceBackground";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import UtilityBar from "@/components/space/UtilityBar";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  const { username, email } = user;
  const fallback = username.split(" ");

  return (
    <div className="h-full w-full bg-neutral-900">
      <SpaceBackground />
      <UtilityBar fallback={fallback} username={username} email={email} />
    </div>
  );
}
