"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Star, Search, Filter } from "lucide-react"
import { CATEGORIES } from "@/data/inventory"
import Link from "next/link"

type ApiResult = {
  query: {
    zip: string
    center: { lat: number; lng: number; city: string; state: string }
    q: string
    categories: string[]
    vendor: string | null
  }
  count: number
  items: Array<{
    id: string
    name: string
    brand?: string
    category: string
    pricePerDay: number
    image?: string
    vendor: {
      id: string
      name: string
      slug: string
      address1: string
      city: string
      state: string
      zip: string
      rating: number
      reviewsCount: number
    }
    distanceMiles: number
    distanceKm: number
  }>
}

export default function NearbyListingsPage() {
  const params = useSearchParams()
  const router = useRouter()
  const zip = params.get("zip") || ""
  const qParam = params.get("q") || ""
  const categoriesParam = params.get("categories") || ""

  const [q, setQ] = useState(qParam)
  const [selected, setSelected] = useState<string[]>(categoriesParam ? categoriesParam.split(",").filter(Boolean) : [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [data, setData] = useState<ApiResult | null>(null)

  const canFetch = useMemo(() => /^\d{5}(-\d{4})?$/.test(zip), [zip])

  const updateQuery = (updates: Record<string, string | null>) => {
    const url = new URL(window.location.href)
    Object.entries(updates).forEach(([k, v]) => {
      if (v === null || v === "") url.searchParams.delete(k)
      else url.searchParams.set(k, v)
    })
    router.replace(`${url.pathname}?${url.searchParams.toString()}`)
  }

  useEffect(() => {
    if (!canFetch) return
    const controller = new AbortController()
    const doFetch = async () => {
      setLoading(true)
      setError("")
      try {
        const qs = new URLSearchParams()
        qs.set("zip", zip)
        if (qParam) qs.set("q", qParam)
        if (categoriesParam) qs.set("categories", categoriesParam)
        const res = await fetch(`/api/inventory?${qs.toString()}`, { signal: controller.signal })
        const json = await res.json()
        if (!res.ok || json?.error) throw new Error(json?.error || "Failed to load")
        setData(json)
      } catch (e: any) {
        if (e.name !== "AbortError") setError(e?.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }
    doFetch()
    return () => controller.abort()
  }, [zip, qParam, categoriesParam, canFetch])

  useEffect(() => {
    const t = setTimeout(() => {
      if (q !== qParam) updateQuery({ q: q || null })
    }, 300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  const toggleCategory = (cat: string) => {
    const next = selected.includes(cat) ? selected.filter((c) => c !== cat) : [...selected, cat]
    setSelected(next)
    updateQuery({ categories: next.join(",") || null })
  }

  if (!zip) {
    return (
      <main>
        <section className="bg-orange-500 text-white">
          <div className="container mx-auto px-4 py-14">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2">Find Camera Gear</h1>
            <p className="text-white/90 max-w-2xl">
              Add ?zip=10001 to the URL or use the homepage form to start your search.
            </p>
            <div className="mt-6">
              <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white">
                <Link href="/">Go to homepage</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-orange-500 text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
            Find Camera Gear near {data?.query.center.city || "your city"}
          </h1>
          <p className="text-white/90 max-w-2xl">
            Browse equipment from vendors around {data?.query.center.city || "..."} {data?.query.center.state || ""}.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                <Input
                  defaultValue={zip}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const target = e.target as HTMLInputElement
                      updateQuery({ zip: target.value })
                    }
                  }}
                  placeholder="Enter ZIP (e.g., 10001)"
                  className="pl-10 bg-white/15 text-white placeholder:text-white/70 border-white/30 focus:border-white focus:ring-white"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                  <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search gear by name or brand (e.g., Komodo, Aputure)"
                    className="pl-10 bg-white/15 text-white placeholder:text-white/70 border-white/30 focus:border-white focus:ring-white"
                  />
                </div>
                <Button
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                  onClick={() => updateQuery({ q: q || null })}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Results */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-semibold mb-2">Categories</div>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => (
                      <label key={cat} className="flex items-center gap-2">
                        <Checkbox
                          checked={selected.includes(cat)}
                          onCheckedChange={() => toggleCategory(cat)}
                          aria-label={`Filter by ${cat}`}
                        />
                        <span className="text-sm">{cat}</span>
                      </label>
                    ))}
                  </div>
                  {selected.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {selected.map((s) => (
                        <Badge key={s} variant="secondary">
                          {s}
                        </Badge>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => {
                          setSelected([])
                          updateQuery({ categories: null })
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">
                {loading
                  ? "Loading listings..."
                  : error
                    ? "Could not load listings"
                    : `Showing ${data?.count || 0} item${(data?.count || 0) === 1 ? "" : "s"} near ${
                        data?.query.center.city || ""
                      }, ${data?.query.center.state || ""}`}
              </div>
            </div>

            {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {(data?.items || []).map((r) => (
                <Card key={r.id} className="overflow-hidden">
                  <div className="aspect-[16/10] bg-muted">
                    <img
                      src={r.image || "/placeholder.svg?height=240&width=360&query=camera%20gear"}
                      alt={r.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      {r.name}{" "}
                      <Badge variant="secondary" className="ml-2">
                        {r.category}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">${r.pricePerDay}</div>
                      <div className="text-sm text-muted-foreground">per day</div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{r.vendor.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({r.vendor.reviewsCount})</span>
                      </div>
                      <div className="text-muted-foreground">{r.distanceMiles.toFixed(1)} mi away</div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {r.vendor.city}, {r.vendor.state} {r.vendor.zip}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href={`/vendor/${encodeURIComponent(r.vendor.slug)}`}
                        className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                      >
                        View vendor
                      </Link>
                      <Button asChild variant="outline" size="sm" className="bg-transparent">
                        <Link href={`/listing/${r.id}`}>View listing</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {!loading && (data?.items || []).length === 0 && (
              <div className="text-sm text-muted-foreground mt-6">
                No items matched your filters. Try a different category or search term.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
