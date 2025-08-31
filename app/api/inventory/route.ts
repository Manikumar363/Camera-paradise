import { NextResponse } from "next/server"
import { VENDORS } from "@/data/vendors"
import { INVENTORY } from "@/data/inventory"
import { getCenterForZip, haversineMiles } from "@/lib/geo"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const zip = searchParams.get("zip") || ""
  const q = (searchParams.get("q") || "").toLowerCase().trim()
  const categories = (searchParams.get("categories") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const vendorParam = searchParams.get("vendor") || null

  const center = getCenterForZip(zip)
  if (!center) {
    return NextResponse.json({ error: "Invalid or unsupported ZIP." }, { status: 400 })
  }

  // Compute vendor distances
  const vendorWithDistance = VENDORS.map((v) => ({
    ...v,
    distanceMiles: haversineMiles(center, v.location),
  }))

  // Nearby threshold (miles)
  const NEARBY_RADIUS = 50

  const nearbyVendors = vendorWithDistance.filter((v) => v.distanceMiles <= NEARBY_RADIUS)

  const items = INVENTORY.filter((item) => {
    const vendor = nearbyVendors.find((v) => v.id === item.vendorId)
    if (!vendor) return false
    if (vendorParam && !(vendor.id === vendorParam || vendor.slug === vendorParam)) return false
    if (categories.length && !categories.includes(item.category)) return false
    if (q && !`${item.name} ${item.brand ?? ""}`.toLowerCase().includes(q)) return false
    return true
  })
    .map((item) => {
      const v = nearbyVendors.find((vv) => vv.id === item.vendorId)!
      return {
        id: item.id,
        name: item.name,
        brand: item.brand,
        category: item.category,
        pricePerDay: item.pricePerDay,
        image: item.image,
        vendor: {
          id: v.id,
          name: v.name,
          slug: v.slug,
          address1: v.address1,
          city: v.city,
          state: v.state,
          zip: v.zip,
          rating: v.rating,
          reviewsCount: v.reviewsCount,
        },
        distanceMiles: v.distanceMiles,
        distanceKm: v.distanceMiles * 1.60934,
      }
    })
    .sort((a, b) =>
      a.distanceMiles === b.distanceMiles ? a.pricePerDay - b.pricePerDay : a.distanceMiles - b.distanceMiles,
    )

  return NextResponse.json({
    query: { zip, center, q, categories, vendor: vendorParam },
    count: items.length,
    items,
  })
}
