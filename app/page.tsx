import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ZipCodeSearch from "@/components/zip-code-search"
import type { LucideIcon } from "lucide-react"
import { Camera, Bone as Drone, Video, Lightbulb, Mic, Axis3D, Aperture, Package2, Search } from "lucide-react"

type CategoryDef = { name: string; icon: LucideIcon; count?: number }

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      title: "Red Komodo 6K",
      subtitle: "Cinema Camera",
      price: 450,
      image: "/red-komodo.png",
      badge: "Popular",
    },
    {
      id: 2,
      title: "DJI Air 2S",
      subtitle: "Drone with 4K Camera",
      price: 85,
      image: "/dji-air-2s.png",
      badge: "New",
    },
    {
      id: 3,
      title: "DJI RS3 PRO",
      subtitle: "3-Axis Gimbal Stabilizer",
      price: 65,
      image: "/dji-rs3-pro.png",
      badge: "Featured",
    },
    {
      id: 4,
      title: "Canon EOS R5",
      subtitle: "Mirrorless Camera",
      price: 120,
      image: "/canon-r5.png",
      badge: "Trending",
    },
  ]

  const categories: CategoryDef[] = [
    { name: "Cameras", icon: Camera, count: 245 },
    { name: "Drones", icon: Drone, count: 89 },
    { name: "Accessories", icon: Package2, count: 312 },
    { name: "Gimbals", icon: Axis3D, count: 156 },
    { name: "Lenses", icon: Aperture, count: 203 },
    { name: "Audio", icon: Mic, count: 98 },
    { name: "Lighting", icon: Lightbulb, count: 67 },
    { name: "Video", icon: Video, count: 54 },
  ]

  const productGrid = [
    {
      id: 1,
      title: "Red Komodo 6K",
      subtitle: "Cinema Camera",
      price: 450,
      originalPrice: 500,
      image: "/red-komodo.png",
      isLiked: false,
      rating: 4.8,
      reviews: 24,
    },
    {
      id: 2,
      title: "ARRIFLEX PRO",
      subtitle: "Professional Camera",
      price: 380,
      originalPrice: 420,
      image: "/arri-alexa.png",
      isLiked: true,
      rating: 4.9,
      reviews: 156,
    },
    {
      id: 3,
      title: "Sony FX3",
      subtitle: "Full Frame Cinema Camera",
      price: 285,
      originalPrice: 320,
      image: "/sony-fx3.png",
      isLiked: false,
      rating: 4.7,
      reviews: 89,
    },
    {
      id: 4,
      title: "DJI Phantom",
      subtitle: "Professional Drone",
      price: 165,
      originalPrice: 200,
      image: "/dji-phantom.png",
      isLiked: false,
      rating: 4.6,
      reviews: 203,
    },
  ]

  const vendors = [
    { name: "Panavision", logo: "/panavision.png" },
    { name: "Penmen Studios", logo: "/penmen-studios.png" },
    { name: "Fox Rentals", logo: "/fox-rentals.png" },
    { name: "Customise", logo: "/customise.png" },
    { name: "Tygt Rentals", logo: "/tygt-rentals.png" },
    { name: "Airhead Rentals", logo: "/airhead-rentals.png" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header strip for this page (global header is in app/layout.tsx) */}
      

      {/* Hero Section with ZIP search */}
      <section className="bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-6">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Camera Gear in @cityname</h1>
              <p className="text-lg opacity-90 mb-6 max-w-md">
                Browse film equipment listed by top rental businesses in your city. No middleman.
              </p>
              <div className="max-w-xl">
                <ZipCodeSearch />
              </div>
            </div>
            <Button asChild size="lg" className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3">
              <Link href="/nearby">Browse</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase (carousel) */}
      <section className="px-4 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-4">
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-black text-white relative">
                    <div className="absolute top-3 right-3 z-10">
                      <Badge variant="secondary" className="bg-orange-500 text-white">
                        {product.badge}
                      </Badge>
                    </div>
                    <CardContent className="p-0">
                      <div className="aspect-square bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-xl font-bold mb-1">{product.title}</h3>
                          <p className="text-sm text-gray-300 mb-4">{product.subtitle}</p>
                          <div className="text-2xl font-bold">${product.price}</div>
                          <div className="text-xs text-gray-400">per day</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
            <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 bg-transparent">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.name}
                  href={`/browse?category=${encodeURIComponent(category.name)}`}
                  className="group"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                      <Icon className="h-8 w-8 text-gray-600 group-hover:text-orange-500" />
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-orange-500">{category.name}</h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured grid */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured</h2>
            <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 bg-transparent">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productGrid.map((product) => (
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
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.subtitle}</p>
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
        </div>
      </section>

      {/* Top Vendors */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Top vendors</h2>
            <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 bg-transparent">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {vendors.map((vendor) => (
              <div key={vendor.name} className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={vendor.logo || "/placeholder.svg"}
                    alt={vendor.name}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">{vendor.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Popular products</h2>
            <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 bg-transparent">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productGrid.map((product) => (
              <Card key={`popular-${product.id}`} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.subtitle}</p>
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
        </div>
      </section>

      {/* Recent Listings */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Recent Listings</h2>
            <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 bg-transparent">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productGrid.map((product) => (
              <Card key={`recent-${product.id}`} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.subtitle}</p>
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
        </div>
      </section>
    </div>
  )
}
