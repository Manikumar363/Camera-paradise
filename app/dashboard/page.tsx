"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  MessageCircle,
  Calendar,
  DollarSign,
  Star,
  MoreHorizontal,
  Camera,
  Clock,
} from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = {
    totalListings: 8,
    activeRentals: 3,
    totalEarnings: 1250,
    avgRating: 4.8,
  }

  const myListings = [
    {
      id: 1,
      title: "Canon EOS R5 Mirrorless Camera",
      price: 45,
      status: "active",
      views: 124,
      bookings: 8,
      image: "/placeholder.svg?height=100&width=150",
      rating: 4.8,
      reviews: 24,
    },
    {
      id: 2,
      title: "Sony A7 III + 24-70mm Lens Kit",
      price: 38,
      status: "rented",
      views: 89,
      bookings: 12,
      image: "/placeholder.svg?height=100&width=150",
      rating: 4.9,
      reviews: 31,
    },
    {
      id: 3,
      title: "DJI Ronin-S Gimbal Stabilizer",
      price: 25,
      status: "inactive",
      views: 67,
      bookings: 5,
      image: "/placeholder.svg?height=100&width=150",
      rating: 4.7,
      reviews: 18,
    },
  ]

  const activeRentals = [
    {
      id: 1,
      item: "Canon EOS R5",
      renter: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      startDate: "2024-01-15",
      endDate: "2024-01-18",
      total: 135,
      status: "ongoing",
    },
    {
      id: 2,
      item: "Sony A7 III Kit",
      renter: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      startDate: "2024-01-16",
      endDate: "2024-01-17",
      total: 76,
      status: "ongoing",
    },
  ]

  const messages = [
    {
      id: 1,
      from: "Emily Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      subject: "Question about Canon R5 availability",
      preview: "Hi! I'm interested in renting your Canon R5 for a wedding shoot...",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      from: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      subject: "Booking confirmation needed",
      preview: "Thanks for accepting my booking request. When can we arrange pickup?",
      time: "5 hours ago",
      unread: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "rented":
        return "bg-blue-500"
      case "inactive":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Available"
      case "rented":
        return "Currently Rented"
      case "inactive":
        return "Inactive"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Manage your camera rental business</p>
          </div>
          <Link href="/list-item">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Listing
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="rentals">Active Rentals</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                  <Camera className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalListings}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeRentals}</div>
                  <p className="text-xs text-muted-foreground">Currently ongoing</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalEarnings}</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgRating}</div>
                  <p className="text-xs text-muted-foreground">Based on 73 reviews</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeRentals.map((rental) => (
                    <div key={rental.id} className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={rental.avatar || "/placeholder.svg"} alt={rental.renter} />
                        <AvatarFallback>{rental.renter[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{rental.renter}</p>
                        <p className="text-sm text-gray-600">{rental.item}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${rental.total}</p>
                        <p className="text-sm text-gray-600">{rental.startDate}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Listings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {myListings.slice(0, 3).map((listing) => (
                    <div key={listing.id} className="flex items-center gap-4">
                      <Image
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.title}
                        width={60}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium line-clamp-1">{listing.title}</p>
                        <p className="text-sm text-gray-600">{listing.views} views</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${listing.price}/day</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{listing.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">My Listings ({myListings.length})</h2>
              <Link href="/list-item">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Listing
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((listing) => (
                <Card key={listing.id} className="group">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <Image
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className={`absolute top-2 right-2 ${getStatusColor(listing.status)}`}>
                        {getStatusText(listing.status)}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Listing
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2 line-clamp-2">{listing.title}</CardTitle>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{listing.rating}</span>
                      <span className="text-sm text-gray-600">({listing.reviews})</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">{listing.views}</span> views
                      </div>
                      <div>
                        <span className="font-medium">{listing.bookings}</span> bookings
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-2xl font-bold text-blue-600">
                        ${listing.price}
                        <span className="text-sm font-normal text-gray-600">/day</span>
                      </span>
                      <Link href={`/listing/${listing.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rentals" className="space-y-6">
            <h2 className="text-2xl font-semibold">Active Rentals ({activeRentals.length})</h2>

            <div className="space-y-4">
              {activeRentals.map((rental) => (
                <Card key={rental.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={rental.avatar || "/placeholder.svg"} alt={rental.renter} />
                          <AvatarFallback>{rental.renter[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{rental.renter}</h3>
                          <p className="text-gray-600">{rental.item}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {rental.startDate} - {rental.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="font-semibold">${rental.total}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-2xl font-semibold">Messages</h2>

            <div className="space-y-4">
              {messages.map((message) => (
                <Card
                  key={message.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow ${
                    message.unread ? "border-blue-200 bg-blue-50/50" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.from} />
                        <AvatarFallback>{message.from[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-medium ${message.unread ? "font-semibold" : ""}`}>{message.from}</h3>
                          <span className="text-sm text-gray-500">{message.time}</span>
                        </div>
                        <h4 className={`text-sm mb-1 ${message.unread ? "font-medium" : "text-gray-600"}`}>
                          {message.subject}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{message.preview}</p>
                      </div>
                      {message.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                    </div>
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
