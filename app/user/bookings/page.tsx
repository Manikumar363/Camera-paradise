"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Calendar,
  MapPin,
  MessageCircle,
  Star,
  Eye,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"

export default function UserBookingsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [reviewDialog, setReviewDialog] = useState<any>(null)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  const activeBookings = [
    {
      id: 1,
      equipment: "Canon EOS R5 Mirrorless Camera",
      owner: "John Photography",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=100&width=150",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      total: 135,
      status: "confirmed",
      location: "New York, NY",
      pickupTime: "2:00 PM",
      returnTime: "2:00 PM",
      bookingId: "BK001",
    },
    {
      id: 2,
      equipment: "Sony A7 III + 24-70mm Lens Kit",
      owner: "Sarah's Rentals",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=100&width=150",
      startDate: "2024-01-25",
      endDate: "2024-01-27",
      total: 76,
      status: "ongoing",
      location: "Los Angeles, CA",
      pickupTime: "10:00 AM",
      returnTime: "10:00 AM",
      bookingId: "BK002",
    },
  ]

  const completedBookings = [
    {
      id: 1,
      equipment: "Nikon D850 DSLR Camera Body",
      owner: "Pro Rentals Co",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=100&width=150",
      startDate: "2024-01-10",
      endDate: "2024-01-12",
      total: 105,
      status: "completed",
      location: "Miami, FL",
      bookingId: "BK003",
      reviewed: false,
    },
    {
      id: 2,
      equipment: "Canon 70-200mm f/2.8L IS III USM",
      owner: "Lens Masters",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=100&width=150",
      startDate: "2024-01-05",
      endDate: "2024-01-07",
      total: 84,
      status: "completed",
      location: "Seattle, WA",
      bookingId: "BK004",
      reviewed: true,
    },
  ]

  const cancelledBookings = [
    {
      id: 1,
      equipment: "DJI Ronin-S Gimbal Stabilizer",
      owner: "Mike's Gear",
      ownerAvatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=100&width=150",
      startDate: "2024-01-08",
      endDate: "2024-01-10",
      total: 75,
      status: "cancelled",
      location: "Chicago, IL",
      bookingId: "BK005",
      cancelReason: "Equipment unavailable",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "ongoing":
        return "bg-blue-500"
      case "completed":
        return "bg-gray-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "ongoing":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const handleReviewSubmit = () => {
    // In a real app, this would submit the review to the backend
    console.log("Review submitted:", { rating, reviewText })
    setReviewDialog(null)
    setRating(0)
    setReviewText("")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Bookings</h1>
            <p className="text-gray-600">Manage your equipment rentals and bookings</p>
          </div>
          <Link href="/browse">
            <Button>
              <Eye className="mr-2 h-4 w-4" />
              Browse Equipment
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active & Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="space-y-4">
              {activeBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <Image
                        src={booking.image || "/placeholder.svg"}
                        alt={booking.equipment}
                        width={120}
                        height={80}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{booking.equipment}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={booking.ownerAvatar || "/placeholder.svg"} alt={booking.owner} />
                                <AvatarFallback>{booking.owner[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-gray-600">by {booking.owner}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                              <MapPin className="h-4 w-4" />
                              <span>{booking.location}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold mb-2">${booking.total}</div>
                            <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
                              {getStatusIcon(booking.status)}
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">Rental Period:</span>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">
                            {booking.startDate} - {booking.endDate}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">Pickup/Return:</span>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">
                            {booking.pickupTime} / {booking.returnTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">Booking ID: {booking.bookingId}</div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Message Owner
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="space-y-4">
              {completedBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <Image
                        src={booking.image || "/placeholder.svg"}
                        alt={booking.equipment}
                        width={120}
                        height={80}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{booking.equipment}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={booking.ownerAvatar || "/placeholder.svg"} alt={booking.owner} />
                                <AvatarFallback>{booking.owner[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-gray-600">by {booking.owner}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                              <MapPin className="h-4 w-4" />
                              <span>{booking.location}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {booking.startDate} - {booking.endDate}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold mb-2">${booking.total}</div>
                            <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
                              {getStatusIcon(booking.status)}
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">Booking ID: {booking.bookingId}</div>
                        <div className="flex gap-2">
                          {!booking.reviewed && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" onClick={() => setReviewDialog(booking)}>
                                  <Star className="mr-2 h-4 w-4" />
                                  Leave Review
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Review Your Rental Experience</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label>Rating</Label>
                                    <div className="flex gap-1 mt-2">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                          key={star}
                                          onClick={() => setRating(star)}
                                          className={`p-1 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                                        >
                                          <Star className="h-6 w-6 fill-current" />
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <Label htmlFor="review">Review</Label>
                                    <Textarea
                                      id="review"
                                      placeholder="Share your experience with this rental..."
                                      value={reviewText}
                                      onChange={(e) => setReviewText(e.target.value)}
                                      rows={4}
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <Button onClick={handleReviewSubmit} disabled={rating === 0}>
                                      Submit Review
                                    </Button>
                                    <Button variant="outline" onClick={() => setReviewDialog(null)}>
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-6">
            <div className="space-y-4">
              {cancelledBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <Image
                        src={booking.image || "/placeholder.svg"}
                        alt={booking.equipment}
                        width={120}
                        height={80}
                        className="rounded object-cover opacity-60"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-600">{booking.equipment}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={booking.ownerAvatar || "/placeholder.svg"} alt={booking.owner} />
                                <AvatarFallback>{booking.owner[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-gray-600">by {booking.owner}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                              <MapPin className="h-4 w-4" />
                              <span>{booking.location}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {booking.startDate} - {booking.endDate}
                              </span>
                            </div>
                            <div className="text-sm text-red-600">Reason: {booking.cancelReason}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-500 mb-2">${booking.total}</div>
                            <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
                              {getStatusIcon(booking.status)}
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">Booking ID: {booking.bookingId}</div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </div>
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
