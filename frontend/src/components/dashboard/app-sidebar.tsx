"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import {
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  Code2,
  FolderOpen,
  LayoutDashboard,
  Loader2,
  LogOut,
  Moon,
  Plus,
  Settings,
  Star,
  Sun,
  TrendingUp,
  User2,
  Zap
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
    description: "Overview of your portfolio"
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User2,
    badge: null,
    description: "Manage your personal information"
  },
  {
    title: "Work Experience",
    url: "/dashboard/work-experience",
    icon: BriefcaseBusiness,
    badge: "New",
    description: "Add your work history"
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: FolderOpen,
    badge: null,
    description: "Showcase your projects"
  },
  {
    title: "Skills",
    url: "/dashboard/skills",
    icon: Code2,
    badge: null,
    description: "Highlight your expertise"
  },
]

const quickActions = [
  { title: "Add Project", icon: Plus, action: "add-project" },
  { title: "View Portfolio", icon: Star, action: "view-portfolio" },
  { title: "Analytics", icon: TrendingUp, action: "analytics" },
]

export function AppSidebar() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const { currentUser, loading, error } = useCurrentUser();
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "https://ui-avatars.com/api/?name=User",
  })

  useEffect(() => {

    if (currentUser && !loading) {
      setUser({
        name: currentUser.fullName || "",
        email: currentUser.email || "",
        avatar: "https://ui-avatars.com/api/?name=" + (currentUser.fullName || "User"),
      });
    }
  }, [currentUser, loading, error]);

  const handleQuickAction = (action: string) => {
    // Handle quick actions
    console.log(`Quick action: ${action}`);
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <TooltipProvider>
      <Sidebar className="border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <SidebarContent className="px-3 py-2">
          {/* Header Section */}
          <SidebarGroup className="pt-0 pb-4">
            <SidebarGroupLabel className="h-20 px-2 flex items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 mx-2 rounded-2xl border border-border/50 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 w-full">
                <div className="relative group flex-shrink-0">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <FolderOpen className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-background animate-pulse shadow-sm" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>
                <div className="flex flex-col flex-1 overflow-hidden">
                  <div className="text-base font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Portfolio Builder
                  </div>
                  <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500 flex-shrink-0" />
                    <span>Build your future</span>
                  </div>
                </div>
              </div>
            </SidebarGroupLabel>

            {/* Quick Actions Bar */}
            <div className="px-2 pt-3 pb-2">
              <div className="flex items-center justify-between bg-accent/30 rounded-xl p-2 border border-border/30">
                <div className="flex gap-1">
                  {quickActions.map((action) => (
                    <Tooltip key={action.action}>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                          onClick={() => handleQuickAction(action.action)}
                        >
                          <action.icon className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        {action.title}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
                <div className="flex gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-accent transition-all duration-200"
                      >
                        <Bell className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      Notifications
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-accent transition-all duration-200"
                        onClick={toggleTheme}
                      >
                        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      Toggle theme
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>

            <Separator className="mx-2 my-3 bg-border/50" />

            {/* Navigation Menu */}
            <SidebarGroupContent className="px-2">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                  Main Menu
                </h3>
              </div>
              <SidebarMenu className="space-y-2">
                {items.map((item) => {
                  const isActive = pathname === item.url || (item.url !== '/dashboard' && pathname.startsWith(item.url))
                  return (
                    <SidebarMenuItem key={item.title}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            className={cn(
                              "h-11 px-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                              "hover:shadow-sm hover:shadow-primary/10",
                              isActive
                                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 border border-primary/20"
                                : "hover:bg-accent/60 hover:text-accent-foreground border border-transparent hover:border-border/50"
                            )}
                          >
                            <Link href={item.url} className="flex items-center gap-3 w-full">
                              <div className={cn(
                                "relative z-10 transition-all duration-300",
                                isActive ? "scale-110" : "group-hover:scale-105"
                              )}>
                                <item.icon className="w-4 h-4" />
                              </div>
                              <span className="font-medium relative z-10 flex-1">{item.title}</span>
                              <div className="flex items-center gap-2">
                                {item.badge && (
                                  <Badge variant="secondary" className="h-5 px-2 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                    {item.badge}
                                  </Badge>
                                )}
                                {isActive && (
                                  <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse" />
                                )}
                              </div>
                              {/* Hover effect overlay */}
                              {!isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="text-xs">
                          {item.description}
                        </TooltipContent>
                      </Tooltip>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Enhanced Footer with User Profile */}
        <SidebarFooter className="px-3 pb-3">
          <Separator className="mb-3 bg-border/50" />
          <div className="space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-accent/60 transition-all duration-300 border border-transparent hover:border-border/50 group hover:shadow-sm backdrop-blur-sm">
                  <div className="relative">
                    <Avatar className="h-10 w-10 ring-2 ring-primary/20 shadow-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white font-bold text-sm">
                        {user.name.slice(0, 1) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    {loading && (
                      <div className="absolute -top-1 -right-1 bg-background rounded-full p-0.5">
                        <Loader2 className="w-3 h-3 animate-spin text-primary" />
                      </div>
                    )}
                    {!loading && !error && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-semibold truncate flex items-center gap-2">
                      {loading ? "Loading..." : (user.name || "User")}
                      {!loading && !error && user.name && (
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {loading ? "..." : (error ? "Error loading user" : (user.email || "No email"))}
                    </span>
                    {!loading && !error && user.name && (
                      <Badge variant="outline" className="w-fit mt-1 px-2 py-0 text-xs border-emerald-200 text-emerald-700 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:bg-emerald-900/20">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full mr-1 animate-pulse" />
                        Online
                      </Badge>
                    )}
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:rotate-180" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-72 p-3 shadow-xl border-border/50" side="top">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border border-border/30 mb-3">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/30">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white font-bold">
                      {user.name.slice(0, 1) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1">
                    <span className="font-bold text-sm">{user.name || "User"}</span>
                    <span className="text-xs text-muted-foreground">{user.email || "No email"}</span>
                    <Badge variant="secondary" className="w-fit mt-1 px-2 py-0.5 text-xs bg-primary/10 text-primary border-primary/20">
                      Pro User
                    </Badge>
                  </div>
                </div>
                <DropdownMenuSeparator className="my-2" />
                <div className="space-y-1">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="flex items-center gap-3 cursor-pointer rounded-lg p-2 hover:bg-accent/50">
                      <User2 className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">Profile</span>
                      <Badge variant="outline" className="ml-auto text-xs">View</Badge>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 cursor-pointer rounded-lg p-2 hover:bg-accent/50">
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span className="font-medium">Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 cursor-pointer rounded-lg p-2 hover:bg-accent/50">
                    <Bell className="w-4 h-4 text-amber-500" />
                    <span className="font-medium">Notifications</span>
                    <Badge variant="destructive" className="ml-auto text-xs h-4 w-4 p-0 flex items-center justify-center">3</Badge>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="my-3" />
                <DropdownMenuItem
                  className="flex items-center gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer rounded-lg p-2 font-medium"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  )
}
