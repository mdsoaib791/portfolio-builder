"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { cn } from "@/lib/utils"
import { Briefcase, FolderGit2, LayoutDashboard, LogOut, Moon, Settings, Sparkles, Sun, UserIcon } from "lucide-react"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Profile", url: "/dashboard/profile", icon: UserIcon },
  { title: "Work Experience", url: "/dashboard/work-experience", icon: Briefcase },
  { title: "Projects", url: "/dashboard/projects", icon: FolderGit2 },
  { title: "Skills", url: "/dashboard/skills", icon: Sparkles },
]

function useActiveMatcher() {
  const pathname = usePathname() || "/"
  const normalize = (u: string) => u.replace(/\/+$/, "")
  return (url: string) => {
    const p = normalize(pathname)
    const u = normalize(url)
    return p === u || p.startsWith(u + "/")
  }
}

export function AppSidebar() {
  const { theme, setTheme } = useTheme()
  const isActive = useActiveMatcher()
  const { currentUser } = useCurrentUser()
  const [name, setName] = useState("User")
  const [email, setEmail] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("https://ui-avatars.com/api/?name=User")

  useEffect(() => {
    if (currentUser) {
      const fullName = currentUser.fullName || "User"
      setName(fullName)
      setEmail(currentUser.email || "")
      setAvatarUrl("https://ui-avatars.com/api/?name=" + encodeURIComponent(fullName))
    }
  }, [currentUser])




  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="pt-0">
          <SidebarGroupLabel className="h-16 px-0 flex items-center justify-center bg-background">
            <div className="text-xl font-bold text-primary text-balance">Portfolio Builder</div>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = isActive(item.url)
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group flex w-full items-center gap-2 rounded-md px-2 py-2 transition-colors",
                          "hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          active ? "bg-accent text-foreground border-l-2 border-primary" : "text-muted-foreground",
                        )}
                      >
                        <Icon
                          className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground")}
                          aria-hidden="true"
                        />
                        <span className={cn(active ? "font-medium text-foreground" : "font-normal")}>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator className="mx-3 my-2" />

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Open user menu"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={name ? `${name} avatar` : "User avatar"} />
                <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium">{name}</span>
                {email ? <span className="truncate text-xs text-muted-foreground">{email}</span> : null}
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" aria-hidden="true" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="h-4 w-4" aria-hidden="true" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" aria-hidden="true" /> Light mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" aria-hidden="true" /> Dark mode
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer flex items-center gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
