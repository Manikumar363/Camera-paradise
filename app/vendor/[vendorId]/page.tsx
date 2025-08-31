import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getVendor } from "@/data/vendors"
import { INVENTORY } from "@/data/inventory"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { VendorFilters } from "@/components/vendor-filters"
import VendorItemCard from "@/components/vendor-item-card"
import { Star, ArrowLeft, MapPin } from "lucide-react"

type PageProps = {
  params: { vendorId: string }
  searchParams?: Record<string, string | string[] | undefined>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const vendor = getVendor(params.vendorId)
  if (!vendor) return { title: "Vendor not found" }
  return {
    title: `${vendor.name} – Camera Paradise`,
    description: `Rental house located in ${vendor.city}, ${vendor.state}.`,
  }
}

export default function VendorPage({ params, searchParams }: PageProps) {
  const vendor = getVendor(params.vendorId)
  if (!vendor) return notFound()

  const username = vendor.slug.replace(/-+/g, "_")
  const description = `Rental house located in ${vendor.city}, ${vendor.state}.`
  const coverImage = vendor.cover || "/placeholder.svg"
  const logoImage = vendor.logo || "/placeholder.svg"

  // URL filter params
  const q = (searchParams?.q as string) || ""
  const min = Number((searchParams?.min as string) || "0")
  const max = Number((searchParams?.max as string) || "1000")
  const cats = ((searchParams?.categories as string) || "")
    .split(",")
    .filter(Boolean)

  // Filter inventory (removed status filter since InventoryItem has no 'status')
  let items = INVENTORY.filter((it) => it.vendorId === vendor.id)
  if (q) {
    const qq = q.toLowerCase()
    items = items.filter(
      (it) =>
        it.name.toLowerCase().includes(qq) ||
        (it.brand || "").toLowerCase().includes(qq)
    )
  }
  items = items.filter((it) => it.pricePerDay >= min && it.pricePerDay <= max)
  if (cats.length) items = items.filter((it) => cats.includes(it.category))

  return (
    <div className="min-h-screen">
      <div className="relative w-full h-[220px] md:h-[300px]">
        <Image
          src={coverImage}
          alt={`${vendor.name} cover`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="container px-4 md:px-6 -mt-12">
        <Card className="p-4 md:p-6">
          <div className="flex items-start gap-4 md:gap-6">
            <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden ring-2 ring-background">
              <Image
                src={logoImage}
                alt={`${vendor.name} logo`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">{vendor.name}</h1>
                <Badge variant="secondary">{vendor.categories[0] || "Rental"}</Badge>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>@{username}</span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {vendor.rating} ({vendor.reviewsCount})
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {vendor.city}, {vendor.state} {vendor.zip}
                </span>
              </div>
              <p className="mt-3 text-muted-foreground">{description}</p>
            </div>

            <div className="hidden md:flex">
              <Button className="self-start">Message</Button>
            </div>
          </div>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3">
            <VendorFilters />
          </div>

          <div className="md:col-span-9">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/nearby" className="inline-flex items-center gap-1 hover:underline">
                  <ArrowLeft className="h-4 w-4" />
                  Back to results
                </Link>
                <Separator orientation="vertical" className="h-4" />
                <span>
                  Showing <strong>{items.length}</strong> item{items.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="hidden md:flex gap-2">
                {vendor.categories.slice(0, 5).map((c) => (
                  <Badge key={c} variant="secondary">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((it) => (
                <VendorItemCard key={it.id} item={it} />
              ))}
            </div>

            {items.length === 0 && (
              <div className="mt-10 text-center text-muted-foreground">
                No items match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
