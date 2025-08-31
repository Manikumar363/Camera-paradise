"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, MessageCircle, CheckCircle, Eye } from "lucide-react"

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const [activeTab, setActiveTab] = useState("about")

  // Mock data - in real app this would come from API based on params.username
  const user = {
    username: params.username,
    name: "John Photography",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Passionate photographer specializing in landscape and portrait photography. Always looking for new gear to try!",
    location: "New York, NY",
    joinedDate: "2019",
    verified: true,
    ownerRating: 4.9,
    ownerReviews: 156,
    renterRating: 4.8,
    renterReviews: 87,
    responseRate: 98,
    responseTime: "2 hours",
  }

  const userListings = [
    {
      id: 1,
      title: "Canon EOS R5 Mirrorless Camera",
      price: 45,
      status: "active",
      views: 124,
      bookings: 8,
      image: "/placeholder.svg?height=200&width=300",
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
      image: "/placeholder.svg?height=200&width=300",
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
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      reviews: 18,
    },
  ]

  const reviewsGiven = [
    {
      id: 1,
      reviewer: "Sarah M.",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent communication and the gear was in perfect condition. Highly recommend!",
      item: "Canon EOS R5",
    },
    {
      id: 2,
      reviewer: "Mike R.",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 4,
      date: "1 month ago",
      comment: "Smooth pickup and return. The lens worked great for my project.",
      item: "Sony 24-70mm Lens",
    },
  ]

  const reviewsReceived = [
    {
      id: 1,
      reviewer: "Emily K.",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      date: "3 weeks ago",
      comment: "John was very helpful and responsive. The Canon R5 was exactly as described.",
      item: "Canon EOS R5",
    },
    {
      id: 2,
      reviewer: "David L.",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      date: "2 months ago",
      comment: "Fantastic experience! John's Sony A7 III was well-maintained and performed flawlessly.",
      item: "Sony A7 III",
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                <p className="text-gray-600 mb-4">@{user.username}</p>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{user.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Verified Member</span>
                  <span className="ml-2">Joined {user.joinedDate}</span>
                </div>
                <Button className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message {user.name.split(" ")[0]}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About {user.name.split(" ")[0]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Owner Rating:</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>
                        {user.ownerRating} ({user.ownerReviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Renter Rating:</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>
                        {user.renterRating} ({user.renterReviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Response Rate:</p>
                    <p className="text-gray-700">{user.responseRate}%</p>
                  </div>
                  <div>
                    <p className="font-medium">Response Time:</p>
                    <p className="text-gray-700">{user.responseTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="listings">Listings ({userListings.length})</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({user.ownerReviews + user.renterReviews})</TabsTrigger>
              </TabsList>

              {/* About Tab Content (already covered by sidebar, but can add more details here) */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">Location:</p>
                        <p className="text-gray-700">{user.location}</p>
                      </div>
                      <div>
                        <p className="font-medium">Member Since:</p>
                        <p className="text-gray-700">{user.joinedDate}</p>
                      </div>
                      <div>
                        <p className="font-medium">Owner Rating:</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>
                            {user.ownerRating} ({user.ownerReviews} reviews)
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Renter Rating:</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>
                            {user.renterRating} ({user.renterReviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Listings Tab Content */}
              <TabsContent value="listings" className="space-y-6">
                <h3 className="text-xl font-semibold">Equipment Listed by {user.name.split(" ")[0]}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userListings.map((listing) => (
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

              {/* Reviews Tab Content */}
              <TabsContent value="reviews" className="space-y-6">
                <h3 className="text-xl font-semibold">Reviews Received ({reviewsReceived.length})</h3>
                <div className="space-y-6">
                  {reviewsReceived.map((review) => (
                    <div key={review.id} className="flex gap-4 p-4 border rounded-lg">
                      <Avatar>
                        <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.reviewer} />
                        <AvatarFallback>{review.reviewer[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{review.reviewer}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">For:</span> {review.item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mt-8">Reviews Given ({reviewsGiven.length})</h3>
                <div className="space-y-6">
                  {reviewsGiven.map((review) => (
                    <div key={review.id} className="flex gap-4 p-4 border rounded-lg">
                      <Avatar>
                        <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.reviewer} />
                        <AvatarFallback>{review.reviewer[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{review.reviewer}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">About:</span> {review.item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
