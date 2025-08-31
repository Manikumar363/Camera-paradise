"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Camera,
  DollarSign,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  List,
  BarChart3,
  Settings,
  Eye,
  Trash2,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = {
    totalUsers: 1250,
    activeListings: 345,
    pendingListings: 12,
    totalRevenue: 75000,
    newReports: 5,
    unreadMessages: 18,
  }

  const recentActivities = [
    {
      id: 1,
      type: "New Listing",
      description: "Canon EOS R5 by John Photography",
      time: "2 hours ago",
      link: "/admin/listings?status=pending",
      icon: <Camera className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 2,
      type: "New User",
      description: "Sarah Johnson registered",
      time: "5 hours ago",
      link: "/admin/users",
      icon: <Users className="h-4 w-4 text-green-500" />,
    },
    {
      id: 3,
      type: "Report",
      description: "Listing #123 flagged for inappropriate content",
      time: "1 day ago",
      link: "/admin/reports",
      icon: <AlertCircle className="h-4 w-4 text-red-500" />,
    },
    {
      id: 4,
      type: "Booking",
      description: "New booking for Sony A7 III",
      time: "2 days ago",
      link: "/admin/bookings",
      icon: <DollarSign className="h-4 w-4 text-purple-500" />,
    },
  ]

  const pendingListings = [
    {
      id: 1,
      title: "GoPro Hero 10 Black",
      owner: "Action Sports Gear",
      image: "/placeholder.svg?height=60&width=80",
      status: "pending",
    },
    {
      id: 2,
      title: "Aputure Amaran 200x LED Light",
      owner: "Lighting Solutions",
      image: "/placeholder.svg?height=60&width=80",
      status: "pending",
    },
  ]

  const recentReports = [
    {
      id: 1,
      type: "Listing",
      target: "Canon EOS R5 (ID: 456)",
      reason: "Misleading description",
      reporter: "User 789",
      time: "3 hours ago",
    },
    {
      id: 2,
      type: "User",
      target: "Mike's Gear (ID: 101)",
      reason: "Unresponsive owner",
      reporter: "User 123",
      time: "1 day ago",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Overview of platform activity and management tools</p>
          </div>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Site Settings
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">+50 new this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                  <Camera className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeListings}</div>
                  <p className="text-xs text-muted-foreground">+10 new today</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Listings</CardTitle>
                  <List className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingListings}</div>
                  <p className="text-xs text-muted-foreground">Needs review</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+20% from last quarter</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Reports</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.newReports}</div>
                  <p className="text-xs text-muted-foreground">Action required</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.unreadMessages}</div>
                  <p className="text-xs text-muted-foreground">From users</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Pending Listings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <Link
                      key={activity.id}
                      href={activity.link}
                      className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-md transition-colors"
                    >
                      <div className="p-2 rounded-full bg-gray-100">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.type}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Listings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingListings.map((listing) => (
                    <div key={listing.id} className="flex items-center gap-4 p-2 border rounded-md">
                      <Image
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.title}
                        width={60}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium line-clamp-1">{listing.title}</p>
                        <p className="text-sm text-gray-600">by {listing.owner}</p>
                      </div>
                      <Badge variant="secondary">{listing.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Analytics Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" /> Platform Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Platform-wide revenue and user growth charts would be displayed here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <h2 className="text-2xl font-semibold">Listing Management</h2>
            <p className="text-gray-600">Manage all equipment listings on the platform.</p>
            {/* This section would typically have a table of all listings with filters and actions */}
            <Card>
              <CardContent className="p-6">
                <div className="h-48 flex items-center justify-center text-gray-500">
                  Table of all listings with moderation tools.
                </div>
                <Link href="/admin/listings">
                  <Button className="w-full mt-4">Go to Listing Management</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-semibold">User Management</h2>
            <p className="text-gray-600">Manage all user accounts, roles, and verifications.</p>
            {/* This section would typically have a table of all users with filters and actions */}
            <Card>
              <CardContent className="p-6">
                <div className="h-48 flex items-center justify-center text-gray-500">
                  Table of all users with moderation tools.
                </div>
                <Link href="/admin/users">
                  <Button className="w-full mt-4">Go to User Management</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-2xl font-semibold">Reports & Abuse</h2>
            <p className="text-gray-600">Review and take action on reported content and users.</p>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-4 flex items-start gap-4">
                    <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        Report on {report.type}: {report.target}
                      </h3>
                      <p className="text-sm text-gray-700">Reason: {report.reason}</p>
                      <p className="text-xs text-gray-500">
                        Reported by {report.reporter} - {report.time}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" /> Resolve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Dismiss
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
