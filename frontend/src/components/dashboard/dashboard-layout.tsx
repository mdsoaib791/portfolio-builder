'use client'

import { ThemeToggle } from '@/components/common/theme-toggle'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import {
    Briefcase,
    ChevronDown,
    FolderOpen,
    Home,
    LogOut,
    Menu,
    Settings,
    User
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface SidebarNavItem {
    title: string
    href?: string
    icon: React.ComponentType<{ className?: string }>
    items?: {
        title: string
        href: string
        icon: React.ComponentType<{ className?: string }>
    }[]
}

const sidebarNavItems: SidebarNavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Home,
    },
    {
        title: 'Profile',
        href: '/dashboard/profile',
        icon: User,
    },
    {
        title: 'Work Experience',
        href: '/dashboard/work-experience/',
        icon: Briefcase,
    },
    {
        title: 'Projects',
        href: '/dashboard/projects',
        icon: FolderOpen,
    },
    {
        title: 'Skills',
        href: '/dashboard/skills',
        icon: Settings,
    },
]

interface DashboardLayoutProps {
    children: React.ReactNode
}

function SidebarNav({ className }: { className?: string }) {
    const pathname = usePathname()

    return (
        <nav className={cn('space-y-2', className)}>
            {sidebarNavItems.map((item) => {
                if (item.items) {
                    return (
                        <DropdownMenu key={item.title}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-2 px-3 py-2 h-auto text-left"
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span className="flex-1">{item.title}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" align="start" className="w-48">
                                {item.items.map((subItem) => (
                                    <DropdownMenuItem key={subItem.href}>
                                        <Link
                                            href={subItem.href}
                                            className={cn(
                                                'flex items-center gap-2 w-full',
                                                pathname === subItem.href && 'bg-accent'
                                            )}
                                        >
                                            <subItem.icon className="h-4 w-4" />
                                            {subItem.title}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }

                return (
                    <Link href={item.href!} key={item.title}>
                        <Button
                            variant={pathname === item.href ? 'secondary' : 'ghost'}
                            className="w-full justify-start gap-2 px-3 py-2 h-auto"
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </Button>
                    </Link>
                )
            })}
        </nav>
    )
}

function MobileSidebar() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Toggle sidebar</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
                <div className="flex h-full flex-col">
                    <div className="flex items-center border-b px-6 py-4">
                        <h2 className="text-lg font-semibold">Portfolio Builder</h2>
                    </div>
                    <div className="flex-1 overflow-auto p-4">
                        <SidebarNav />
                    </div>
                    <div className="border-t p-4">
                        <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { }}>
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <div className="flex h-screen">
                {/* Desktop Sidebar */}
                <div className="hidden md:flex w-64 flex-col border-r bg-card">
                    <div className="flex items-center border-b px-6 py-4">
                        <h2 className="text-lg font-semibold">Portfolio Builder</h2>
                    </div>
                    <div className="flex-1 overflow-auto p-4">
                        <SidebarNav />
                    </div>
                    <div className="border-t p-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-muted-foreground">Theme</span>
                            <ThemeToggle />
                        </div>
                        <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { }}>
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Mobile Header */}
                    <header className="flex items-center justify-between border-b bg-card px-4 py-3 md:hidden">
                        <MobileSidebar />
                        <h1 className="text-lg font-semibold">Portfolio Builder</h1>
                        <ThemeToggle />
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}
