"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  Command,
  Plus,
  Zap,
  ChevronDown
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

function DashboardTopbar() {
  const { theme, setTheme } = useTheme();
  const { currentUser, loading, error } = useCurrentUser();
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "https://ui-avatars.com/api/?name=User",
  });

  const pathname = usePathname();
  // Extract and format page name
  const pageName = pathname?.split("/").filter(Boolean).pop() || "Dashboard";
  const formattedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, ' ');

  useEffect(() => {
    if (currentUser && !loading) {
      setUser({
        name: currentUser.fullName || "",
        email: currentUser.email || "",
        avatar: "https://ui-avatars.com/api/?name=" + (currentUser.fullName || "User"),
      });
    }
  }, [currentUser, loading, error]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="sticky h-16 top-0 flex items-center justify-between z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-2 shadow-sm">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-9 w-9 rounded-lg hover:bg-accent transition-colors duration-200" />

        <Separator orientation="vertical" className="h-6 bg-border/50" />

        {/* Current page name with breadcrumb style */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Dashboard</span>
            {pageName !== "dashboard" && (
              <>
                <span>/</span>
                <span className="text-foreground font-medium">{formattedPageName}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Enhanced Search Bar */}
        <div className="relative w-[320px] max-w-[320px] hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search or type a command..."
            className="pl-10 pr-20 h-9 bg-background/60 border-border/50 focus:border-primary/50 transition-colors duration-200"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border/50 bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
              <Command className="h-3 w-3" />
              K
            </kbd>
          </div>
        </div>

        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9 rounded-lg hover:bg-accent transition-colors duration-200"
        >
          <Search className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 bg-border/50 hidden md:block" />

        {/* Quick Action Button */}
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 rounded-lg border-border/50 hover:bg-accent hover:border-border transition-all duration-200 hidden lg:flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>New</span>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg hover:bg-accent transition-all duration-200"
          onClick={toggleTheme}
        >
          {theme === "dark" ?
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-200" /> :
            <Moon className="h-4 w-4 rotate-0 scale-100 transition-all duration-200" />
          }
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Enhanced Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-lg hover:bg-accent transition-colors duration-200"
            >
              <Bell className="h-4 w-4" />
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs animate-pulse"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 p-2">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="secondary" className="h-5 px-2 text-xs">3 new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="space-y-1">
              <DropdownMenuItem className="flex items-start gap-3 p-3 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New project created</p>
                  <p className="text-xs text-muted-foreground">Your portfolio has been updated</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-start gap-3 p-3 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Profile completed</p>
                  <p className="text-xs text-muted-foreground">All sections are now filled</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-start gap-3 p-3 rounded-lg">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Skill verification pending</p>
                  <p className="text-xs text-muted-foreground">Complete your skill assessment</p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center text-sm text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Enhanced User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 h-9 px-2 rounded-lg hover:bg-accent transition-all duration-200 group"
            >
              <Avatar className="h-7 w-7 ring-2 ring-background shadow-sm">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-semibold">
                  {user.name.slice(0, 1) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm font-medium leading-none">
                  {loading ? "Loading..." : (user.name || "User")}
                </span>
                <span className="text-xs text-muted-foreground leading-none mt-0.5">
                  {loading ? "..." : (error ? "Error" : (user.email || "No email"))}
                </span>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors duration-200 hidden lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl">
            {/* User Info Header */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/20 mb-2">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                  {user.name.slice(0, 1) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-sm">{user.name || "User"}</span>
                <span className="text-xs text-muted-foreground">{user.email || "No email"}</span>
                <Badge variant="secondary" className="w-fit mt-1 px-2 py-0 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <Zap className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* Menu Items */}
            <div className="space-y-1">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex items-center gap-3 cursor-pointer rounded-lg p-2">
                  <User className="h-4 w-4 text-blue-500" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 cursor-pointer rounded-lg p-2">
                <Settings className="h-4 w-4 text-slate-500" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 cursor-pointer rounded-lg p-2">
                <Bell className="h-4 w-4 text-amber-500" />
                <span>Notifications</span>
                <Badge className="ml-auto h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  3
                </Badge>
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer rounded-lg p-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default DashboardTopbar;
