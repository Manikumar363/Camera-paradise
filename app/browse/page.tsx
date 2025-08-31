import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Star, Heart, Filter, Grid3X3, List, MapPin, Search } from "lucide-react"

export default function BrowsePage() {
  const products = [
    {
      id: 1,
      title: "Red Komodo 6K",
      subtitle: "Cinema Camera",
      price: 450,
      originalPrice: 500,
      rating: 4.8,
      reviews: 24,
      location: "New York, NY",
      image: "/placeholder.svg?height=200&width=200&text=RED+KOMODO",
      isLiked: false,
      badge: "Popular",
    },
    {
      id: 2,
      title: "ARRIFLEX PRO",
      subtitle: "Professional Camera",
      price: 380,
      originalPrice: 420,
      rating: 4.9,
      reviews: 156,
      location: "Los Angeles, CA",
      image: "/placeholder.svg?height=200&width=200&text=ARRIFLEX+PRO",
      isLiked: true,
      badge: "Featured",
    },
    {
      id: 3,
      title: "Sony FX3",
      subtitle: "Full Frame Cinema Camera",
      price: 285,
      originalPrice: 320,
      rating: 4.7,
      reviews: 89,
      location: "Chicago, IL",
      image: "/placeholder.svg?height=200&width=200&text=SONY+FX3",
      isLiked: false,
    },
    {
      id: 4,
      title: "DJI Phantom",
      subtitle: "Professional Drone",
      price: 165,
      originalPrice: 200,
      rating: 4.6,
      reviews: 203,
      location: "Miami, FL",
      image: "/placeholder.svg?height=200&width=200&text=DJI+PHANTOM",
      isLiked: false,
    },
    {
      id: 5,
      title: "Canon EOS R5",
      subtitle: "Mirrorless Camera",
      price: 320,
      originalPrice: 360,
      rating: 4.8,
      reviews: 145,
      location: "Seattle, WA",
      image: "/placeholder.svg?height=200&width=200&text=CANON+EOS+R5",
      isLiked: false,
    },
    {
      id: 6,
      title: "Blackmagic Pocket",
      subtitle: "Cinema Camera 6K",
      price: 275,
      originalPrice: 310,
      rating: 4.6,
      reviews: 98,
      location: "Austin, TX",
      image: "/placeholder.svg?height=200&width=200&text=BLACKMAGIC+6K",
      isLiked: true,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {["Cameras", "Lenses", "Drones", "Audio", "Lighting", "Accessories"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={category} />
                      <label htmlFor={category} className="text-sm text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range (per day)</h4>
                <div className="px-2">
                  <Slider defaultValue={[50, 500]} max={1000} step={10} className="mb-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$50</span>
                    <span>$500</span>
                  </div>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Brand</h4>
                <div className="space-y-2">
                  {["Canon", "Sony", "RED", "Blackmagic", "DJI", "ARRI"].map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox id={brand} />
                      <label htmlFor={brand} className="text-sm text-gray-700">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Location</h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="los-angeles">Los Angeles</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="miami">Miami</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Browse Equipment</h1>
                <p className="text-gray-600">Showing 1,234 results</p>
              </div>
              <div className="flex items-center gap-4">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border border-gray-200 rounded-md">
                  <Button variant="ghost" size="sm" className="border-r">
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                        <Heart
                          className={`h-4 w-4 ${product.isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                        />
                      </Button>
                      {product.badge && (
                        <Badge className="absolute top-2 left-2 bg-orange-500 text-white">{product.badge}</Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.subtitle}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{product.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        <span className="text-xs text-gray-600">per day</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="outline" className="bg-orange-500 text-white">
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">...</Button>
                <Button variant="outline">10</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
