"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Clock, Star, MessageCircle, Heart, CheckCircle, Eye, Calendar, Trash2, MapPin, Settings } from "lucide-react"

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = {
    activeRentals: 2,
    completedRentals: 15,
    savedItems: 7,
    avgRating: 4.8,
    profileCompletion: 75,
  }

  const activeRentals = [
    {
      id: 1,
      item: "Canon EOS R5 Mirrorless Camera",
      owner: "John Photography",
      startDate: "2024-01-20",
      endDate: "2024-01-23",
      total: 135,
      status: "ongoing",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      item: "DJI Ronin-S Gimbal Stabilizer",
      owner: "Mike's Gear",
      startDate: "2024-01-22",
      endDate: "2024-01-22",
      total: 25,
      status: "pickup pending",
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  const pendingReviews = [
    {
      id: 101,
      item: "Sony A7 III + 24-70mm Lens Kit",
      owner: "Sarah's Rentals",
      image: "/placeholder.svg?height=100&width=150",
      rentalDates: "2023-12-10 - 2023-12-15",
    },
  ]

  const savedItems = [
    {
      id: 1,
      title: "Nikon Z9 Mirrorless Camera",
      price: 60,
      location: "New York, NY",
      rating: 4.9,
      reviews: 30,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      title: "Sigma 35mm f/1.4 Art Lens",
      price: 20,
      location: "Los Angeles, CA",
      rating: 4.7,
      reviews: 12,
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-blue-500"
      case "pickup pending":
        return "bg-yellow-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-gray-600">Welcome back, John Doe!</p>
          </div>
          <Link href="/browse">
            <Button>
              <Eye className="mr-2 h-4 w-4" />
              Browse Equipment
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rentals">My Rentals</TabsTrigger>
            <TabsTrigger value="saved">Saved Items</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <CardTitle className="text-sm font-medium">Completed Rentals</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completedRentals}</div>
                  <p className="text-xs text-muted-foreground">Total rentals</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.savedItems}</div>
                  <p className="text-xs text-muted-foreground">For future rentals</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgRating}</div>
                  <p className="text-xs text-muted-foreground">From owners</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Rentals & Pending Reviews */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active & Upcoming Rentals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeRentals.length > 0 ? (
                    activeRentals.map((rental) => (
                      <div key={rental.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <Image
                          src={rental.image || "/placeholder.svg"}
                          alt={rental.item}
                          width={80}
                          height={60}
                          className="rounded object-cover"
                        />
                        <div className="flex-1 ml-4">
                          <p className="font-medium">{rental.item}</p>
                          <p className="text-sm text-gray-600">from {rental.owner}</p>
                          <p className="text-xs text-gray-500">
                            {rental.startDate} - {rental.endDate}
                          </p>
                        </div>
                        <Badge className={getStatusColor(rental.status)}>{rental.status}</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-8">No active rentals.</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Link href="/user/bookings" className="w-full">
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Rentals
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingReviews.length > 0 ? (
                    pendingReviews.map((review) => (
                      <div key={review.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <Image
                          src={review.image || "/placeholder.svg"}
                          alt={review.item}
                          width={80}
                          height={60}
                          className="rounded object-cover"
                        />
                        <div className="flex-1 ml-4">
                          <p className="font-medium">{review.item}</p>
                          <p className="text-sm text-gray-600">from {review.owner}</p>
                          <p className="text-xs text-gray-500">{review.rentalDates}</p>
                        </div>
                        <Button size="sm">
                          <Star className="mr-2 h-4 w-4" /> Write Review
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-8">No reviews pending.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Progress value={stats.profileCompletion} className="w-full" />
                <p className="text-sm text-gray-600">
                  Your profile is {stats.profileCompletion}% complete. Complete your profile to unlock more features!
                </p>
                <Link href="/settings">
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    Complete Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rentals" className="space-y-6">
            <h2 className="text-2xl font-semibold">My Rentals</h2>
            <p className="text-gray-600">View your active, upcoming, and past rentals.</p>
            <Link href="/user/bookings">
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Go to My Bookings
              </Button>
            </Link>
            <div className="space-y-4">
              {activeRentals.map((rental) => (
                <Card key={rental.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <Image
                        src={rental.image || "/placeholder.svg"}
                        alt={rental.item}
                        width={100}
                        height={75}
                        className="rounded object-cover"
                      />
                      <div className="flex-1 ml-4">
                        <h3 className="font-semibold">{rental.item}</h3>
                        <p className="text-gray-600">from {rental.owner}</p>
                        <p className="text-sm text-gray-500">
                          {rental.startDate} - {rental.endDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-xl text-blue-600">${rental.total}</p>
                        <Badge className={getStatusColor(rental.status)}>{rental.status}</Badge>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Link href={`/listing/${rental.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <h2 className="text-2xl font-semibold">Saved Items ({savedItems.length})</h2>
            <p className="text-gray-600">Your favorite equipment for future rentals.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedItems.map((item) => (
                <Card key={item.id} className="group">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2 line-clamp-2">{item.title}</CardTitle>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                      <span className="text-sm text-gray-600">({item.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{item.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-4 pt-0">
                    <span className="text-2xl font-bold text-blue-600">
                      ${item.price}
                      <span className="text-sm font-normal text-gray-600">/day</span>
                    </span>
                    <Link href={`/listing/${item.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-semibold">My Profile</h2>
            <p className="text-gray-600">Manage your public profile and account details.</p>
            <Link href="/settings">
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Go to Settings
              </Button>
            </Link>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">John Doe</h3>
                    <p className="text-gray-600">john.doe@example.com</p>
                    <p className="text-sm text-gray-500">New York, NY</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Passionate photographer specializing in landscape and portrait photography. Always looking for new
                  gear to try!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
