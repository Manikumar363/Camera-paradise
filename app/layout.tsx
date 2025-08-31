import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Camera, Menu, Search, Home, List, MessageSquare, Settings, HelpCircle, Users, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Camera Paradise - Professional Camera Equipment Rental",
  description: "Browse film equipment listed by top rental businesses in your city. No middleman.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold" prefetch={false}>
                <Camera className="h-6 w-6" />
                <span className="sr-only">Camera Rental</span>
                <span className="hidden md:inline">Camera Rental</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link href="/browse" className="hover:text-primary" prefetch={false}>
                  Browse
                </Link>
                <Link href="/list-item" className="hover:text-primary" prefetch={false}>
                  List Your Gear
                </Link>
                <Link href="/help" className="hover:text-primary" prefetch={false}>
                  Help
                </Link>
                <Link href="/about" className="hover:text-primary" prefetch={false}>
                  About
                </Link>
              </nav>
              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search equipment..." className="pl-9 w-[200px] lg:w-[300px]" />
                </div>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
                <Suspense fallback={<div>Loading...</div>}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span className="sr-only">Toggle user menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile/john-doe">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/user/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/user/bookings">My Bookings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/owner/dashboard">Owner Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/messages">Messages</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/notifications">Notifications</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <Link href="/" className="flex items-center gap-2 font-semibold mb-6" prefetch={false}>
                        <Camera className="h-6 w-6" />
                        <span>Camera Rental</span>
                      </Link>
                      <nav className="grid gap-4 text-lg font-medium">
                        <Link
                          href="/browse"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
                          prefetch={false}
                        >
                          <Search className="h-5 w-5" />
                          Browse
                        </Link>
                        <Link
                          href="/list-item"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
                          prefetch={false}
                        >
                          <List className="h-5 w-5" />
                          List Your Gear
                        </Link>
                        <Link
                          href="/user/dashboard"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
                          prefetch={false}
                        >
                          <Home className="h-5 w-5" />
                          My Dashboard
                        </Link>
                        <Link
                          href="/messages"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
                          prefetch={false}
                        >
                          <MessageSquare className="h-5 w-5" />
                          Messages
                        </Link>
                        <Link
                          href="/notifications"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
                          prefetch={false}
                        >
                          <Bell className="h-5 w-5" />
                          Notifications
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
                          prefetch={false}
                        >
                          <Settings className="h-5 w-5" />
                          Settings
                        </Link>
                        <Link
                          href="/help"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
                          prefetch={false}
                        >
                          <HelpCircle className="h-5 w-5" />
                          Help
                        </Link>
                        <Link
                          href="/admin"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
                          prefetch={false}
                        >
                          <Users className="h-5 w-5" />
                          Admin Panel
                        </Link>
                      </nav>
                    </SheetContent>
                  </Sheet>
                </Suspense>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t bg-background py-8">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 text-sm px-4 md:px-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Camera Rental</h3>
                <p className="text-muted-foreground">Your go-to platform for renting and listing camera equipment.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Quick Links</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/browse" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      Browse Equipment
                    </Link>
                  </li>
                  <li>
                    <Link href="/list-item" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      List Your Gear
                    </Link>
                  </li>
                  <li>
                    <Link href="/user/dashboard" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      My Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/messages" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      Messages
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Company</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/about" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Connect</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      Twitter
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="container text-center text-xs text-muted-foreground mt-8 px-4 md:px-6">
              {"\u00A9"} {new Date().getFullYear()} Camera Rental Platform. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
