"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { CATEGORIES } from "@/data/inventory"

type Props = {
  defaultOpen?: string[]
}

export function VendorFilters({ defaultOpen = ["status", "price", "categories"] }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()

  // Local UI state sourced from URL
  const [q, setQ] = useState(sp.get("q") ?? "")
  const [minPrice, setMinPrice] = useState<number>(Number(sp.get("min") ?? "0"))
  const [maxPrice, setMaxPrice] = useState<number>(Number(sp.get("max") ?? "1000"))
  const [status, setStatus] = useState<"any" | "available" | "unavailable">((sp.get("status") as any) || "any")
  const selectedCategories = useMemo(() => new Set((sp.get("categories") || "").split(",").filter(Boolean)), [sp])
  const [categories, setCategories] = useState<Set<string>>(selectedCategories)

  useEffect(() => {
    // Sync from URL on mount/update
    setQ(sp.get("q") ?? "")
    setMinPrice(Number(sp.get("min") ?? "0"))
    setMaxPrice(Number(sp.get("max") ?? "1000"))
    setStatus(((sp.get("status") as any) || "any") as any)
    setCategories(new Set((sp.get("categories") || "").split(",").filter(Boolean)))
  }, [sp])

  function pushParams(next: URLSearchParams) {
    router.push(`${pathname}?${next.toString()}`)
  }

  function updateParam(key: string, value?: string) {
    const next = new URLSearchParams(sp.toString())
    if (!value || value.length === 0) next.delete(key)
    else next.set(key, value)
    pushParams(next)
  }

  function toggleCategory(cat: string) {
    const next = new URLSearchParams(sp.toString())
    const current = new Set((sp.get("categories") || "").split(",").filter(Boolean))
    if (current.has(cat)) current.delete(cat)
    else current.add(cat)
    if (current.size === 0) next.delete("categories")
    else next.set("categories", [...current].join(","))
    pushParams(next)
  }

  function applyPrice([min, max]: number[]) {
    const next = new URLSearchParams(sp.toString())
    next.set("min", String(Math.round(min)))
    next.set("max", String(Math.round(max)))
    pushParams(next)
  }

  function applyStatus(nextStatus: "any" | "available" | "unavailable") {
    const next = new URLSearchParams(sp.toString())
    if (nextStatus === "any") next.delete("status")
    else next.set("status", nextStatus)
    pushParams(next)
  }

  function resetAll() {
    const next = new URLSearchParams(sp.toString())
    ;["q", "min", "max", "status", "categories", "page"].forEach((k) => next.delete(k))
    pushParams(next)
  }

  return (
    <aside className="bg-card border rounded-xl p-4 md:p-5 sticky top-24 h-max">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">Filter</h3>
        <Button variant="ghost" size="sm" onClick={resetAll}>
          Reset
        </Button>
      </div>

      <div className="mb-4 space-y-2">
        <Label htmlFor="q">Search</Label>
        <Input
          id="q"
          placeholder="Search item, brand..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") updateParam("q", q.trim())
          }}
        />
        <div className="flex gap-2">
          <Button size="sm" onClick={() => updateParam("q", q.trim())}>
            Apply
          </Button>
          <Button size="sm" variant="outline" onClick={() => updateParam("q", "")}>
            Clear
          </Button>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={defaultOpen} className="w-full">
        <AccordionItem value="status">
          <AccordionTrigger>Status</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {(["any", "available", "unavailable"] as const).map((s) => (
                <Button
                  key={s}
                  variant={status === s ? "default" : "outline"}
                  size="sm"
                  className="justify-start"
                  onClick={() => applyStatus(s)}
                >
                  {s === "any" ? "Any" : s === "available" ? "Available" : "Unavailable"}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <Slider
                defaultValue={[minPrice, maxPrice]}
                min={0}
                max={1000}
                step={5}
                onValueChange={(val) => {
                  setMinPrice(val[0])
                  setMaxPrice(val[1])
                }}
                onValueCommit={applyPrice}
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${minPrice}/d</span>
                <span>${maxPrice}/d</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {CATEGORIES.map((c) => {
                const checked = categories.has(c as string)
                return (
                  <label key={c} className="flex items-center gap-2">
                    <Checkbox checked={checked} onCheckedChange={() => toggleCategory(c as string)} aria-label={c} />
                    <span className="text-sm">{c}</span>
                  </label>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}
