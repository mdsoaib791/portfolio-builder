'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { ThemeToggle } from '../common/theme-toggle'

export function Navigation() {
  const [active, setActive] = useState('About')
  const { data: session, status } = useSession()

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ]

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo / Title */}
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portfolio Builder
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActive(item.label)}
                className={`relative text-sm font-medium transition-colors ${active === item.label
                  ? 'text-blue-600'
                  : 'text-foreground/80 hover:text-foreground'
                  }`}
              >
                {item.label}
                {active === item.label && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded"></span>
                )}
              </a>
            ))}

            {/* Authentication buttons */}
            {status === 'loading' ? (
              <div className="text-sm text-foreground/60">Loading...</div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-foreground/80">
                  Welcome, {session.user?.fullName || session.user?.email}
                </span>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="default" size="sm">
                  Login
                </Button>
              </Link>
            )}

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-4 mt-6">
                  {navItems.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setActive(link.label)}
                      className={`text-base font-medium ${active === link.label
                        ? 'text-blue-600'
                        : 'text-gray-800 hover:text-blue-600'
                        }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Mobile Authentication buttons */}
                  {status === 'loading' ? (
                    <div className="text-sm text-gray-600 mt-4">Loading...</div>
                  ) : session ? (
                    <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        Welcome, {session.user?.fullName || session.user?.email}
                      </div>
                      <Link href="/dashboard">
                        <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
                          Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        className="w-full rounded-full"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Link href="/login" className="mt-4">
                      <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
