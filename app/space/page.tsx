import SpaceBackground from "@/components/space/SpaceBackground";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { validateRequest } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";

export default async function page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  const { username } = user;
  const fallback = username.split(" ");

  return (
    <div className="h-full w-full bg-neutral-900">
      <SpaceBackground />
      <div className="fixed right-2 top-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://i.pinimg.com/564x/8a/ac/55/8aac551c0d7d1d0f43fb3ff2f8d78b70.jpg" />
              <AvatarFallback>
                {fallback[0][0].toUpperCase() +
                  (fallback[1]
                    ? fallback[1][0].toUpperCase()
                    : fallback[0][1].toUpperCase())}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 min-w-52">
            <DropdownMenuLabel className="pb-0 font-medium">
              {username}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="py-0 text-xs font-normal text-neutral-600">
              m@example.com
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
