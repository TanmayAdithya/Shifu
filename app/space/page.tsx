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
import { IoVideocamOutline as VideoCall } from "react-icons/io5";
import FullScreenIcon from "@/components/space/FullScreenIcon";
import { IoMdSettings as SettingsIcon } from "react-icons/io";
import { TbUserFilled as UserIcon } from "react-icons/tb";
import LogoutButton from "@/components/auth/LogoutButton";
import { ModeToggle } from "@/components/ui/mode-toggle";

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
      <div className="fixed right-2 top-3 z-20 flex items-center gap-2">
        <div className="flex h-11 w-28 items-center justify-between rounded-xl bg-white p-1 shadow-md dark:bg-neutral-900">
          <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:hover:bg-orange-500/80">
            <div>
              <VideoCall size={"1.25rem"} />
            </div>
          </div>
          <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:hover:bg-neutral-800">
            <FullScreenIcon />
          </div>
          <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-neutral-200">
            <div>
              <ModeToggle />
            </div>
          </div>
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <Avatar className="h-12 w-12 border-2 border-neutral-50 shadow-md dark:border-neutral-900">
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
          <DropdownMenuContent className="mr-2 min-w-52 rounded-xl p-2">
            <div className="ml-1 flex items-center">
              <Avatar className="h-8 w-8">
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
              <div className="mb-1">
                <DropdownMenuLabel className="py-0 font-medium">
                  {username}
                </DropdownMenuLabel>
                <DropdownMenuLabel className="py-0 text-xs font-normal text-neutral-600 dark:text-neutral-400">
                  {email}
                </DropdownMenuLabel>
              </div>
            </div>
            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer">
                  <UserIcon className="mr-1 text-neutral-700 dark:text-neutral-100" />
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
                  <SettingsIcon className="mr-1 text-neutral-700 dark:text-neutral-100" />
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
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
