import { notFound } from "next/navigation"
import { LISTINGS, getListing } from "@/data/listings"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Heart, Share2, MapPin, Calendar, Shield, MessageCircle } from "lucide-react"

export function generateStaticParams() {
  return LISTINGS.map(l => ({ id: String(l.id) }))
}

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = getListing(params.id)
  if (!listing) return notFound()

  const reviews = [
    {
      id: 1,
      user: "Sarah M.",
      avatar: "/placeholder.svg?height=40&width=40&text=SM",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Amazing gear! Everything worked flawlessly and was well maintained.",
    },
    {
      id: 2,
      user: "Mike R.",
      avatar: "/placeholder.svg?height=40&width=40&text=MR",
      rating: 5,
      date: "1 month ago",
      comment: "Great experience. Pickup was smooth and the kit was complete.",
    },
    {
      id: 3,
      user: "Emily K.",
      avatar: "/placeholder.svg?height=40&width=40&text=EK",
      rating: 4,
      date: "2 months ago",
      comment: "Solid condition and fair price.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <span>/</span>
          <Link href="/browse" className="hover:text-orange-500">
            Browse
          </Link>
          <span>/</span>
          <span className="text-gray-900">{listing.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={listing.images[0] || "/placeholder.svg"}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
                  <Heart className="h-5 w-5 text-gray-600" />
                </Button>
                <Button variant="ghost" size="icon" className="absolute top-4 right-16 bg-white/80 hover:bg-white">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {listing.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${listing.title} ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Title and Basic Info */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                  <p className="text-lg text-gray-600">{listing.subtitle}</p>
                </div>
                {listing.badge && <Badge className="bg-orange-500 text-white">{listing.badge}</Badge>}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{listing.rating}</span>
                  <span>({listing.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{listing.location}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specs</TabsTrigger>
                <TabsTrigger value="included">What's Included</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed">{listing.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(listing.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-900">{key}:</span>
                          <span className="text-gray-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="included" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {listing.included.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                              <AvatarFallback>{review.user.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-gray-900">{review.user}</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">${listing.price}</span>
                    <span className="text-lg text-gray-500 line-through">${listing.originalPrice}</span>
                  </div>
                  <p className="text-gray-600">per day</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-green-600 font-medium">{listing.availability.nextAvailable}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Protected by insurance</span>
                  </div>
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mb-3">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Owner
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  Check Availability
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Meet Your Host</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={listing.owner.avatar || "/placeholder.svg"} alt={listing.owner.name} />
                    <AvatarFallback>{listing.owner.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{listing.owner.name}</h3>
                      {listing.owner.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>
                        {listing.owner.rating} ({listing.owner.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{listing.owner.joinedDate}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>{listing.owner.responseTime}</p>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rental Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Security Deposit:</span>
                    <p className="text-gray-600">{listing.policies.deposit}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Insurance:</span>
                    <p className="text-gray-600">{listing.policies.insurance}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Pickup:</span>
                    <p className="text-gray-600">{listing.policies.pickup}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Cancellation:</span>
                    <p className="text-gray-600">{listing.policies.cancellation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
