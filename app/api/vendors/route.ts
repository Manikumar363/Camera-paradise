import { NextResponse } from "next/server"
import { VENDORS } from "@/data/vendors"
import { getCenterForZip, haversineMiles } from "@/lib/geo"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const zip = searchParams.get("zip") || ""
  const cats = (searchParams.get("categories") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  const center = getCenterForZip(zip)
  if (!center) {
    return NextResponse.json({ error: "Invalid or unsupported ZIP." }, { status: 400 })
  }

  const scored = VENDORS.map((v) => ({
    ...v,
    distanceMiles: haversineMiles(center, v.location),
  }))
    .filter((v) => (cats.length ? v.categories.some((c) => cats.includes(c)) : true))
    .sort((a, b) => a.distanceMiles - b.distanceMiles)
    .slice(0, 12)

  return NextResponse.json({
    query: { zip, center },
    count: scored.length,
    vendors: scored,
  })
}
