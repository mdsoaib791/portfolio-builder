"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { ThemeToggle } from "../common/theme-toggle";

function DashboardTopbar() {

  const pathname = usePathname();
  // Extract last part of the URL as page name
  const pageName = pathname?.split("/").filter(Boolean).pop() || "Dashboard";
  return (
    <div className="sticky h-16 top-0 flex items-center justify-between z-50 border-b bg-background px-4 py-4">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="h-10 w-10" />


        {/*Current page name*/}
        <h1 className="text-lg font-semibold capitalize">{pageName}</h1>

        {/* Search Bar */}

      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <div className="relative w-[300px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search or type command..."
            className="pl-10 pr-16"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border px-2 py-0.5 text-xs text-gray-500">
            ⌘ K
          </div>
        </div>
        {/* Dark Mode Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-orange-500" />
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="/avatar.png" alt="Musharof" />
              <AvatarFallback>MU</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default DashboardTopbar;
