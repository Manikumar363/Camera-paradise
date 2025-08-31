import type { Coord } from "@/lib/geo"

export type Vendor = {
  id: string
  slug: string
  name: string
  address1: string
  city: string
  state: string
  zip: string
  location: Coord
  rating: number
  reviewsCount: number
  categories: string[] // what they generally carry
  logo?: string
  cover?: string
}

export const VENDORS: Vendor[] = [
  {
    id: "gotham",
    slug: "gotham-camera-rentals",
    name: "Gotham Camera Rentals",
    address1: "500 7th Ave",
    city: "New York",
    state: "NY",
    zip: "10018",
    location: { lat: 40.7537, lng: -73.9891 },
    rating: 4.7,
    reviewsCount: 128,
    categories: ["Cameras", "Cinema Cameras", "Gimbals", "Audio", "Lenses"],
    logo: "/vendors/gotham-logo.jpg",
    cover: "/vendors/gotham-cover.jpg",
  },
  {
    id: "panavision-ny",
    slug: "panavision-midtown",
    name: "Panavision Midtown",
    address1: "1411 Broadway",
    city: "New York",
    state: "NY",
    zip: "10001",
    location: { lat: 40.7546, lng: -73.9879 },
    rating: 4.8,
    reviewsCount: 268,
    categories: ["Cameras", "Lighting", "Lenses"],
    logo: "/vendors/panavision-logo.jpg",
    cover: "/vendors/panavision-cover.jpg",
  },
  {
    id: "brooklyn-gear",
    slug: "brooklyn-gear-house",
    name: "Brooklyn Gear House",
    address1: "195 Montague St",
    city: "Brooklyn",
    state: "NY",
    zip: "11201",
    location: { lat: 40.6933, lng: -73.9903 },
    rating: 4.6,
    reviewsCount: 97,
    categories: ["Cameras", "Accessories", "Drones"],
    logo: "/vendors/brooklyn-logo.jpg",
    cover: "/vendors/brooklyn-cover.jpg",
  },
  {
    id: "la-fox",
    slug: "fox-rentals-la",
    name: "Fox Rentals",
    address1: "8500 Beverly Blvd",
    city: "Los Angeles",
    state: "CA",
    zip: "90048",
    location: { lat: 34.0755, lng: -118.3772 },
    rating: 4.5,
    reviewsCount: 81,
    categories: ["Cameras", "Cinema Cameras", "Lighting"],
    logo: "/vendors/fox-logo.jpg",
    cover: "/vendors/fox-cover.jpg",
  },
]

// Add this helper:
export function getVendorById(id: string) {
  return VENDORS.find(v => v.id === id)
}

// NEW flexible helper (use this in the page)
export function getVendor(key: string) {
  return VENDORS.find(v => v.id === key || v.slug === key)
}
