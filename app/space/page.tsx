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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  // make each dropdown item set some state on click
  // pass that state into your dialog component.
  // render different content inside the dialog component depending on the state

  const { username } = user;
  const fallback = username.split(" ");

  return (
    <div className="h-full w-full bg-neutral-900">
      <SpaceBackground />
      <div className="fixed right-2 top-2">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <Avatar className="h-12 w-12">
              <AvatarImage
                className="shadow-xl"
                src="https://avatars.githubusercontent.com/u/120048605?v=4"
              />
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
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="z-[100]">
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer">
                  Settings
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="z-[100]">
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>Settings Dialog</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
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
