"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination"
import { Search, Filter, List, Grid3X3, Star, MapPin, Camera, Aperture, Mic, Sun, Package, Axis3D } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { redirect } from "next/navigation"

type Props = {
  searchParams?: Record<string, string | string[] | undefined>
}

export default async function SearchResultsPage({ searchParams }: Props) {
  const sp = await searchParams
  const vendorParam = typeof sp.vendor === "string" ? sp.vendor : undefined
  const zipParam = typeof sp.zip === "string" ? sp.zip : undefined

  // Smart redirects:
  if (vendorParam) {
    redirect(`/vendor/${encodeURIComponent(vendorParam)}`)
  }
  if (zipParam) {
    redirect(`/nearby?zip=${encodeURIComponent(zipParam)}`)
  }

  // Default: go to the homepage (starting page)
  redirect("/")

  const [viewMode, setViewMode] = useState("grid") // 'grid' or 'list'
  const [priceRange, setPriceRange] = useState([0, 500])
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    brand: true,
    price: true,
    features: true,
  })

  // Mock data
  const categories: { name: string; icon: LucideIcon }[] = [
    { name: "Cameras", icon: Camera },
    { name: "Lenses", icon: Aperture },
    { name: "Gimbals", icon: Axis3D },
    { name: "Audio", icon: Mic },
    { name: "Lighting", icon: Sun },
    { name: "Accessories", icon: Package },
  ]

  const brands = ["Canon", "Sony", "Nikon", "Fujifilm", "DJI", "Blackmagic", "GoPro"]
  const features = ["4K Video", "Image Stabilization", "Full-Frame", "Wireless Audio", "Waterproof"]

  const listings = [
    {
      id: 1,
      title: "Canon EOS R5 Mirrorless Camera",
      price: 45,
      location: "New York, NY",
      rating: 4.8,
      reviews: 24,
      image: "/placeholder.svg?height=200&width=300",
      category: "Cameras",
      brand: "Canon",
      features: ["4K Video", "Image Stabilization", "Full-Frame"],
    },
    {
      id: 2,
      title: "Sony A7 III + 24-70mm Lens Kit",
      price: 38,
      location: "Los Angeles, CA",
      rating: 4.9,
      reviews: 31,
      image: "/placeholder.svg?height=200&width=300",
      category: "Cameras",
      brand: "Sony",
      features: ["Full-Frame", "Image Stabilization"],
    },
    {
      id: 3,
      title: "DJI Ronin-S Gimbal Stabilizer",
      price: 25,
      location: "Miami, FL",
      rating: 4.7,
      reviews: 18,
      image: "/placeholder.svg?height=200&width=300",
      category: "Gimbals",
      brand: "DJI",
      features: ["Image Stabilization"],
    },
    {
      id: 4,
      title: "Nikon D850 DSLR Camera Body",
      price: 50,
      location: "Chicago, IL",
      rating: 4.6,
      reviews: 20,
      image: "/placeholder.svg?height=200&width=300",
      category: "Cameras",
      brand: "Nikon",
      features: ["Full-Frame"],
    },
    {
      id: 5,
      title: "Rode Wireless Go II Microphone",
      price: 15,
      location: "New York, NY",
      rating: 4.9,
      reviews: 10,
      image: "/placeholder.svg?height=200&width=300",
      category: "Audio",
      brand: "Rode",
      features: ["Wireless Audio"],
    },
    {
      id: 6,
      title: "Canon EF 70-200mm f/2.8L IS III USM Lens",
      price: 30,
      location: "Los Angeles, CA",
      rating: 4.8,
      reviews: 15,
      image: "/placeholder.svg?height=200&width=300",
      category: "Lenses",
      brand: "Canon",
      features: ["Image Stabilization"],
    },
    {
      id: 7,
      title: "Blackmagic Pocket Cinema Camera 6K Pro",
      price: 70,
      location: "San Francisco, CA",
      rating: 4.9,
      reviews: 28,
      image: "/placeholder.svg?height=200&width=300",
      category: "Cameras",
      brand: "Blackmagic",
      features: ["4K Video", "Full-Frame"],
    },
    {
      id: 8,
      title: "Godox AD200Pro Pocket Flash",
      price: 20,
      location: "Dallas, TX",
      rating: 4.7,
      reviews: 14,
      image: "/placeholder.svg?height=200&width=300",
      category: "Lighting",
      brand: "Godox",
      features: [],
    },
  ]

  const toggleFilter = (filterName: keyof typeof expandedFilters) => {
    setExpandedFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search for cameras, lenses, gimbals..." className="pl-9 w-full" />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Select defaultValue="relevance">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating-desc">Top Rated</SelectItem>
                <SelectItem value="newest">Newest Listings</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="hidden sm:flex"
            >
              {viewMode === "grid" ? <List className="h-5 w-5" /> : <Grid3X3 className="h-5 w-5" />}
              <span className="sr-only">Toggle view mode</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto bg-transparent">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Listings</SheetTitle>
                </SheetHeader>
                <div className="grid gap-6 py-4">
                  {/* Category Filter */}
                  <div className="border-b pb-4">
                    <div
                      className="flex justify-between items-center mb-3 cursor-pointer"
                      onClick={() => toggleFilter("category")}
                    >
                      <h3 className="font-semibold">Category</h3>
                      {/* Chevron icons are not needed here as they are already imported */}
                    </div>
                    {expandedFilters.category && (
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category, index) => {
                          const Icon = category.icon
                          return (
                            <Button key={index} variant="outline" className="justify-start gap-2 bg-transparent">
                              <Icon className="h-4 w-4" />
                              {category.name}
                            </Button>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Brand Filter */}
                  <div className="border-b pb-4">
                    <div
                      className="flex justify-between items-center mb-3 cursor-pointer"
                      onClick={() => toggleFilter("brand")}
                    >
                      <h3 className="font-semibold">Brand</h3>
                      {/* Chevron icons are not needed here as they are already imported */}
                    </div>
                    {expandedFilters.brand && (
                      <div className="grid grid-cols-2 gap-2">
                        {brands.map((brand, index) => (
                          <Button key={index} variant="outline" className="justify-start bg-transparent">
                            {brand}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Range Filter */}
                  <div className="border-b pb-4">
                    <div
                      className="flex justify-between items-center mb-3 cursor-pointer"
                      onClick={() => toggleFilter("price")}
                    >
                      <h3 className="font-semibold">Price Range</h3>
                      {/* Chevron icons are not needed here as they are already imported */}
                    </div>
                    {expandedFilters.price && (
                      <div className="space-y-4">
                        <Slider
                          min={0}
                          max={1000}
                          step={10}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features Filter */}
                  <div className="pb-4">
                    <div
                      className="flex justify-between items-center mb-3 cursor-pointer"
                      onClick={() => toggleFilter("features")}
                    >
                      <h3 className="font-semibold">Features</h3>
                      {/* Chevron icons are not needed here as they are already imported */}
                    </div>
                    {expandedFilters.features && (
                      <div className="grid grid-cols-2 gap-2">
                        {features.map((feature, index) => (
                          <Button key={index} variant="outline" className="justify-start bg-transparent">
                            {feature}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Listings Display */}
        <div
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}
        >
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src={listing.image || "/placeholder.svg"}
                alt={listing.title}
                width={viewMode === "grid" ? 300 : 600}
                height={viewMode === "grid" ? 200 : 300}
                className={`w-full ${viewMode === "grid" ? "h-48" : "h-64"} object-cover`}
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{listing.title}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>
                    {listing.rating} ({listing.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <Badge variant="secondary">{listing.category}</Badge>
                  <Badge variant="outline">{listing.brand}</Badge>
                  {listing.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 pt-0">
                <span className="text-2xl font-bold text-blue-600">
                  ${listing.price}
                  <span className="text-base font-normal text-gray-600">/day</span>
                </span>
                <Link href={`/listing/${listing.id}`}>
                  <Button size="sm">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
